import { serverTimestamp } from "firebase/firestore";

import {
  calculateExtendedExpiration,
  getExtensionWindow,
} from "@/lib/reportExpiration";
import {
  getReportById,
  updateReport,
} from "@/services/reports";
import { canExtendReport } from "@/services/lifecycle/expiration";

/**
 * Estende automaticamente il ciclo di vita
 * di una segnalazione.
 *
 * La proroga viene applicata soltanto se:
 *
 * - la segnalazione esiste;
 * - è ACTIVE;
 * - non è scaduta;
 * - è entrata nella extensionWindow;
 * - non ha raggiunto maxExpiresAt.
 */
export async function extendReportExpiration(
  reportId: string
): Promise<void> {
  const report = await getReportById(reportId);

  if (!report) {
    return;
  }

  if (report.status !== "ACTIVE") {
    return;
  }

  if (
    !report.expiresAt ||
    !report.maxExpiresAt
  ) {
    return;
  }

  const extensionWindow =
    getExtensionWindow(report.type);

  if (
    !canExtendReport(
      report.expiresAt,
      report.maxExpiresAt,
      extensionWindow
    )
  ) {
    return;
  }

  const expiresAt =
    calculateExtendedExpiration(
      report.expiresAt,
      report.maxExpiresAt,
      report.type
    );

  await updateReport(report.id, {
    expiresAt,
    lastActivityAt: serverTimestamp(),
  });
}