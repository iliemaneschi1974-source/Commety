import * as logger from "firebase-functions/logger";
import { defineSecret } from "firebase-functions/params";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

import { ReportModerationUpdater } from "./ReportModerationUpdater";
import { ReportAIAnalysisUpdater } from "../firestore/ReportAIAnalysisUpdater";

import { OpenAIClient } from "../ai/client/OpenAIClient";
import { ReportImageReference } from "../ai/dto/ReportImageReference";
import { VisionAnalysisRequest } from "../ai/dto/VisionAnalysisRequest";
import { AIPipeline } from "../ai/pipeline/AIPipeline";

import { StorageImageDownloader } from "../storage/StorageImageDownloader";

import { ModerationRequest } from "../application/ModerationRequest";
import { ModerationService } from "../application/ModerationService";

/**
 * Secret OpenAI.
 */
const openAiApiKey =
  defineSecret("OPENAI_API_KEY");

/**
 * Trigger eseguito quando una segnalazione
 * viene aggiornata.
 *
 * Quando il report riceve la prima immagine
 * viene avviata la pipeline AI.
 */
export const reportUpdatedTrigger =
  onDocumentUpdated(
    {
      document: "reports/{reportId}",
      region: "europe-west1",
      secrets: [openAiApiKey],
    },
    async (event) => {

      const before = event.data?.before.data();
      const after = event.data?.after.data();

      if (!before || !after) {
        return;
      }

      if (after.spamBlocked === true) {
        logger.info("Skipping AI pipeline for spam-blocked report.", {
          reportId: event.params.reportId,
        });
        return;
      }

      const beforeImages =
        Array.isArray(before.images)
          ? before.images.length
          : 0;

      const afterImages =
        Array.isArray(after.images)
          ? after.images as ReportImageReference[]
          : [];

      const beforeVideoFrames =
        Array.isArray(before.video?.moderationFrames)
          ? before.video.moderationFrames.length
          : 0;

      const afterVideoFrames =
        Array.isArray(after.video?.moderationFrames)
          ? after.video.moderationFrames as ReportImageReference[]
          : [];

      const hasNewPhotos =
        beforeImages === 0 && afterImages.length > 0;

      const hasNewVideoFrames =
        beforeVideoFrames === 0 && afterVideoFrames.length > 0;

      /**
       * Avvia la pipeline soltanto
       * quando vengono aggiunte
       * per la prima volta le immagini.
       */
      if (
        !hasNewPhotos && !hasNewVideoFrames
      ) {
        return;
      }

      const moderationImages = hasNewVideoFrames
        ? afterVideoFrames
        : afterImages;

      logger.info(
        "Starting AI Pipeline.",
        {
          reportId: event.params.reportId,
          images: moderationImages.length,
        }
      );

      try {

        /**
         * STEP 1
         * Scarica le immagini da Firebase Storage.
         */
        const downloader =
          new StorageImageDownloader();

        const imageContents =
          await downloader.download(
            moderationImages
          );

        logger.info(
          "Images downloaded successfully.",
          {
            reportId: event.params.reportId,
            images: imageContents.map(
              (image) => ({
                mimeType: image.mimeType,
                size: image.bytes.length,
              })
            ),
          }
        );

        /**
         * STEP 2
         * Avvia la pipeline AI.
         */
        const client =
          new OpenAIClient(
            openAiApiKey.value()
          ).getClient();

        const pipeline =
          new AIPipeline(client);

        const visionRequest: VisionAnalysisRequest = {
          title: after.title ?? "",
          description: after.description ?? "",
          category: after.type ?? "",
          images: imageContents,
        };

        logger.info(
          "Sending images to OpenAI Vision...",
          {
            reportId: event.params.reportId,
          }
        );

        const startedAt =
          Date.now();

        const analysis =
          await pipeline.execute(
            visionRequest
          );

        logger.info(
          "OpenAI pipeline completed.",
          {
            reportId: event.params.reportId,
          }
        );

        const processingTimeMs =
          Date.now() - startedAt;

        /**
         * STEP 3
         * Avvia il Moderation Engine.
         */
        const moderationRequest =
  new ModerationRequest(
    after.type ?? "",
    after.title ?? "",
    after.description ?? "",
    moderationImages.map(
      (image) => image.url
    ),
    analysis
  );

        

const moderationService =
  new ModerationService();





const moderationResult =
  moderationService.execute(
    moderationRequest
  );

        

        logger.info(
          "Moderation completed.",
          {
            reportId: event.params.reportId,
            decision: moderationResult.decision,
            evidences: moderationResult.evidences,
          }
        );

        /**
         * STEP 4
         * Salva l'analisi AI.
         */
        const updater =
          new ReportAIAnalysisUpdater();

        await updater.save(
          event.params.reportId,
          analysis,
          processingTimeMs
        );

        /**
         * STEP 5
         * Salva il risultato della moderazione.
         */
        const moderationUpdater =
          new ReportModerationUpdater();

        await moderationUpdater.save(
          event.params.reportId,
          moderationResult
        );

        logger.info(
          "AI analysis completed.",
          {
            reportId: event.params.reportId,
            processingTimeMs,
            analysis: JSON.stringify(
              analysis,
              null,
              2
            ),
          }
        );

      } catch (error) {

        logger.error(
          "AI Pipeline failed.",
          {
            reportId: event.params.reportId,
            error:
              error instanceof Error
                ? {
                    message: error.message,
                    stack: error.stack,
                  }
                : error,
          }
        );

        throw error;

      }

    }
  );
