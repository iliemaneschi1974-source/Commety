import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

import { ModerationRequest } from "../application/ModerationRequest";
import { ModerationService } from "../application/ModerationService";
import { ReportModerationUpdater } from "./ReportModerationUpdater";

/**
 * Modera i report creati senza immagini.
 *
 * I report con immagini vengono ignorati qui e seguono esclusivamente la
 * pipeline esistente, attivata da reportUpdatedTrigger al primo update di
 * `images`.
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

      if (report.moderationMode !== "TEXT") {
        return;
      }

      logger.info(
        "Starting text-only moderation.",
        {
          reportId: event.params.reportId,
        }
      );

      const moderationRequest =
        new ModerationRequest(
          report.type ?? "",
          report.title ?? "",
          report.description ?? "",
          []
        );

      const moderationService =
        new ModerationService();

      const moderationResult =
        moderationService.execute(
          moderationRequest
        );

      const moderationUpdater =
        new ReportModerationUpdater();

      await moderationUpdater.save(
        event.params.reportId,
        moderationResult
      );

      logger.info(
        "Text-only moderation completed.",
        {
          reportId: event.params.reportId,
          decision: moderationResult.decision.value,
          evidences: moderationResult.evidences.length,
        }
      );
    }
  );
