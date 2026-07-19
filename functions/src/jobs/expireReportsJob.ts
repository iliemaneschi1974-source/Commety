import {
  Timestamp,
} from "firebase-admin/firestore";

import {
  getActiveReports,
} from "../repositories/reportsRepository";
import { adminDb, adminStorage } from "../config/firebaseAdmin";

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
 * segnalazioni ACTIVE e rimuove definitivamente quelle scadute,
 * comprese le risorse in Storage e le sotto-collezioni.
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

    await adminStorage.bucket().deleteFiles({
      prefix: `reports/${report.id}/`,
    });

    await adminDb.recursiveDelete(
      adminDb.collection("reports").doc(report.id)
    );

    expired++;
  }

  return {
    scanned: reports.length,
    expired,
  };
}
