import {httpsCallable} from "firebase/functions";

import {functions} from "@/lib/firebase";
import {getReportOwnerKey} from "@/services/device";

interface DeleteReportDecision {
  archived: boolean;
  missing: boolean;
}

/**
 * Chiede al backend se la segnalazione debba essere archiviata per il Comune.
 * Il backend legge lo stato più recente e verifica la titolarità.
 */
export async function archiveReportIfMunicipallyManaged(
  reportId: string
): Promise<DeleteReportDecision> {
  const callable = httpsCallable<
    {reportId: string; ownerKey: string},
    DeleteReportDecision
  >(functions, "deleteReportByAuthor");

  const result = await callable({
    reportId,
    ownerKey: await getReportOwnerKey(reportId),
  });

  return result.data;
}
