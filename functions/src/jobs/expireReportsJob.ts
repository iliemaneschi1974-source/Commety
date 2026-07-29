import {
  Timestamp,
} from "firebase-admin/firestore";

import {
  getActiveReports,
} from "../repositories/reportsRepository";
import { adminDb, adminStorage } from "../config/firebaseAdmin";
import {hasMunicipalHistory} from "../domain/reportMunicipalHistory";

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
 * segnalazioni ACTIVE. Quelle già trattate dal Comune vengono
 * archiviate; le altre sono eliminate con media e sotto-collezioni.
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

    const reportRef = adminDb.collection("reports").doc(report.id);

    if (hasMunicipalHistory(report)) {
      await reportRef.update({
        status: "EXPIRED",
        isVisible: false,
        archivedForMunicipality: true,
        archivedReason: "EXPIRED",
        expiredAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    } else {
      await adminStorage.bucket().deleteFiles({
        prefix: `reports/${report.id}/`,
      });

      await adminDb.recursiveDelete(reportRef);
    }

    expired++;
  }

  return {
    scanned: reports.length,
    expired,
  };
}
