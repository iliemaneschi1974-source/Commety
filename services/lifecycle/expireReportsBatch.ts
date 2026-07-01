import { expireReport } from "@/services/lifecycle/expireReport";
import { getActiveReports } from "@/services/reports";

/**
 * Risultato del batch di scadenza.
 */
export interface ExpireReportsBatchResult {
  /**
   * Numero di segnalazioni analizzate.
   */
  scanned: number;

  /**
   * Numero di segnalazioni realmente scadute.
   */
  expired: number;
}

/**
 * Analizza tutte le segnalazioni ACTIVE
 * ed esegue automaticamente la scadenza
 * di quelle che hanno superato expiresAt.
 */
export async function expireReportsBatch(): Promise<ExpireReportsBatchResult> {
  const reports = await getActiveReports();

  let expired = 0;

  for (const report of reports) {
    const updated = await expireReport(report.id);

    if (updated) {
      expired++;
    }
  }

  return {
    scanned: reports.length,
    expired,
  };
}