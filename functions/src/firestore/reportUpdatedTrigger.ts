import * as logger from "firebase-functions/logger";
import { defineSecret } from "firebase-functions/params";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { FieldValue } from "firebase-admin/firestore";

import { ReportModerationUpdater } from "./ReportModerationUpdater";
import { ReportAIAnalysisUpdater } from "../firestore/ReportAIAnalysisUpdater";

import { OpenAIClient } from "../ai/client/OpenAIClient";
import { ReportImageReference } from "../ai/dto/ReportImageReference";
import { VisionAnalysisRequest } from "../ai/dto/VisionAnalysisRequest";
import { AIPipeline } from "../ai/pipeline/AIPipeline";

import { StorageImageDownloader } from "../storage/StorageImageDownloader";
import { SensitiveMediaRedactor } from "../privacy/SensitiveMediaRedactor";
import { SanitizedMediaStorage } from "../privacy/SanitizedMediaStorage";
import { CommetyWatermark } from "../privacy/CommetyWatermark";
import { adminDb } from "../config/firebaseAdmin";

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
      memory: "1GiB",
      timeoutSeconds: 300,
      maxInstances: 2,
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

      const needsPrivacyRedaction =
        (hasNewPhotos || hasNewVideoFrames) &&
        after.mediaPrivacy?.state !== "REDACTED";

      if (needsPrivacyRedaction) {
        try {
          await redactSensitiveMedia(
            event.params.reportId,
            afterImages,
            after.video,
            afterVideoFrames
          );

          logger.info("Sensitive media redacted before moderation.", {
            reportId: event.params.reportId,
          });
        } catch (error) {
          logger.error("Sensitive media redaction failed.", {
            reportId: event.params.reportId,
            error: error instanceof Error ? error.message : error,
          });

          await adminDb.collection("reports").doc(event.params.reportId).update({
            isVisible: false,
            mediaPrivacy: {
              state: "FAILED",
              message: "Impossibile proteggere automaticamente i dati sensibili nel media.",
              failedAt: FieldValue.serverTimestamp(),
            },
          });
        }

        return;
      }

      const becamePrivacyRedacted =
        before.mediaPrivacy?.state !== "REDACTED" &&
        after.mediaPrivacy?.state === "REDACTED";

      /**
       * Avvia la pipeline soltanto
       * quando vengono aggiunte
       * per la prima volta le immagini.
       */
      if (
        !hasNewPhotos && !hasNewVideoFrames && !becamePrivacyRedacted
      ) {
        return;
      }

      const moderationImages = afterVideoFrames.length > 0
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

async function redactSensitiveMedia(
  reportId: string,
  images: ReportImageReference[],
  video: {
    storagePath?: string;
    url?: string;
    durationSeconds?: number;
  } | undefined,
  moderationFrames: ReportImageReference[]
): Promise<void> {
  const downloader = new StorageImageDownloader();
  const redactor = new SensitiveMediaRedactor();
  const storage = new SanitizedMediaStorage();
  const watermark = new CommetyWatermark();

  if (images.length > 0) {
    const sourceImages = await downloader.download(images);
    const redactedImages = await Promise.all(
      sourceImages.map((image) => redactor.redactImage(image.bytes))
    );
    const savedImages = await Promise.all(
      redactedImages.map(async (image) =>
        storage.saveImage(reportId, await watermark.apply(image.bytes))
      )
    );

    await adminDb.collection("reports").doc(reportId).update({
      images: savedImages,
      mediaPrivacy: {
          state: "REDACTED",
          imageRegions: redactedImages.reduce((total, image) => total + image.boxes.length, 0),
          redactedAt: FieldValue.serverTimestamp(),
          watermark: {
            appliedAt: FieldValue.serverTimestamp(),
            brand: "Commety",
          },
      },
      updatedAt: FieldValue.serverTimestamp(),
    });

    await Promise.all(images.map((image) => storage.delete(image.storagePath)));
    return;
  }

  if (!video?.storagePath || !video.url || moderationFrames.length !== 3) {
    throw new Error("Il video non contiene i dati necessari per l'oscuramento.");
  }

  const [sourceVideo] = await downloader.download([
    { storagePath: video.storagePath, url: video.url },
  ]);
  const sourceFrames = await downloader.download(moderationFrames);
  const redactedVideo = await redactor.redactVideo(
    sourceVideo.bytes,
    sourceFrames.map((frame) => frame.bytes)
  );
  const [savedVideo, savedFrames] = await Promise.all([
    storage.saveVideo(reportId, redactedVideo.bytes),
    Promise.all(redactedVideo.redactedFrames.map((frame) => storage.saveImage(reportId, frame.bytes))),
  ]);

  await adminDb.collection("reports").doc(reportId).update({
    video: {
      ...savedVideo,
      durationSeconds: video.durationSeconds ?? 5,
      moderationFrames: savedFrames,
    },
    mediaPrivacy: {
      state: "REDACTED",
      videoRegions: redactedVideo.frameBoxes.reduce((total, boxes) => total + boxes.length, 0),
      redactedAt: FieldValue.serverTimestamp(),
    },
    updatedAt: FieldValue.serverTimestamp(),
  });

  await Promise.all([
    storage.delete(video.storagePath),
    ...moderationFrames.map((frame) => storage.delete(frame.storagePath)),
  ]);
}
