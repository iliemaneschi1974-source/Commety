import {
  deleteImage,
  deleteImages,
} from "@/services/storage";

import {
  deleteReportComments,
} from "@/services/comments";

import {
  deleteReportConfirmations,
} from "@/services/confirmations";

import {
  deleteReportStatusVotes,
} from "@/services/reportStatusVotes";

import {
  archiveReportForMunicipality,
  deleteReport,
  getReportById,
} from "@/services/reports";
import { hasMunicipalHistory } from "@/lib/reportMunicipalHistory";

/**
 * Elimina definitivamente una segnalazione
 * e tutte le risorse collegate.
 *
 * L'ordine delle operazioni è importante:
 *
 * 1. immagini
 * 2. commenti
 * 3. conferme
 * 4. report
 */
export async function cleanupReport(
  reportId: string
): Promise<void> {
  const report = await getReportById(reportId);

  if (!report) {
    return;
  }

  if (hasMunicipalHistory(report)) {
    await archiveReportForMunicipality(reportId);
    return;
  }

  await deleteImages(report.images);

  if (report.video) {
    await deleteImage(report.video);
    await deleteImages(report.video.moderationFrames ?? []);
  }

  await deleteReportComments(reportId);

  await deleteReportConfirmations(reportId);

  await deleteReportStatusVotes(reportId);

  await deleteReport(reportId);
}
