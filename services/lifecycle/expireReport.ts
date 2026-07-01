import { serverTimestamp } from "firebase/firestore";

import {
  getReportById,
  updateReport,
} from "@/services/reports";

import { isReportExpired } from "@/services/lifecycle/expiration";

/**
 * Porta automaticamente una segnalazione
 * nello stato EXPIRED.
 *
 * Restituisce:
 *
 * - true  -> stato aggiornato
 * - false -> nessuna modifica effettuata
 */
export async function expireReport(
  reportId: string
): Promise<boolean> {
  const report = await getReportById(reportId);

  if (!report) {
    return false;
  }

  if (report.status !== "ACTIVE") {
    return false;
  }

  if (!report.expiresAt) {
    return false;
  }

  if (!isReportExpired(report.expiresAt)) {
    return false;
  }

  await updateReport(report.id, {
    status: "EXPIRED",
    lastActivityAt: serverTimestamp(),
  });

  return true;
}