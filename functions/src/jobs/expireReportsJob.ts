import {
  Timestamp,
} from "firebase-admin/firestore";

import {
  getActiveReports,
  updateReport,
} from "../repositories/reportsRepository";

/**
 * Risultato del job di scadenza.
 */
export interface ReportExpirationResult {
  /**
   * Report analizzati.
   */
  scanned: number;

  /**
   * Report portati in stato EXPIRED.
   */
  expired: number;
}

/**
 * Esegue il controllo di tutte le
 * segnalazioni ACTIVE e porta in
 * stato EXPIRED quelle scadute.
 */
export async function expireReports(): Promise<ReportExpirationResult> {
  const reports = await getActiveReports();

  let expired = 0;

  const now = Date.now();

  for (const report of reports) {
    const expiresAt = report.expiresAt;

    if (!(expiresAt instanceof Timestamp)) {
      continue;
    }

    if (expiresAt.toMillis() > now) {
      continue;
    }

    await updateReport(report.id, {
      status: "EXPIRED",
      lastActivityAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    expired++;
  }

  return {
    scanned: reports.length,
    expired,
  };
}