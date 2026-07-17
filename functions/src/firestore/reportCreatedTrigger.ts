import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

import { ModerationService } from "../application/ModerationService";
import { ReportModerationUpdater } from "./ReportModerationUpdater";
import { ReportImageReference } from "../ai/dto/ReportImageReference";

/**
 * Trigger eseguito alla creazione
 * di una nuova segnalazione.
 *
 * Si occupa esclusivamente della
 * moderazione delle segnalazioni
 * prive di immagini.
 *
 * Le segnalazioni con immagini
 * verranno gestite dal
 * reportUpdatedTrigger.
 */
export const reportCreatedTrigger =
  onDocumentCreated(
    {
      document: "reports/{reportId}",
      region: "europe-west1",
    },
    async (event) => {

      const report = event.data?.data();

      if (!report) {
        return;
      }

      const images =
        Array.isArray(report.images)
          ? report.images as ReportImageReference[]
          : [];

      /**
       * Le segnalazioni con immagini
       * vengono gestite dalla AI Pipeline.
       */
      if (images.length > 0) {

        logger.info(
          "Skipping text moderation because report contains images.",
          {
            reportId: event.params.reportId,
            images: images.length,
          }
        );

        return;

      }

      logger.info(
        "Starting text moderation.",
        {
          reportId: event.params.reportId,
        }
      );

      const moderationService =
        new ModerationService();

      const moderationResult =
        moderationService.executeTextOnly(
          report.category ?? "",
          report.title ?? "",
          report.description ?? ""
        );

      logger.info(
        "Text moderation completed.",
        {
          reportId: event.params.reportId,
          decision: moderationResult.decision,
          evidences: moderationResult.evidences,
        }
      );

      const moderationUpdater =
        new ReportModerationUpdater();

      await moderationUpdater.save(
        event.params.reportId,
        moderationResult
      );

      logger.info(
        "Text moderation saved.",
        {
          reportId: event.params.reportId,
        }
      );

    }
  );