import {FieldValue} from "firebase-admin/firestore";
import {HttpsError, onCall} from "firebase-functions/v2/https";

import {adminDb} from "../config/firebaseAdmin";

const REPORT_ID_PATTERN = /^[A-Za-z0-9_-]{1,160}$/;
const OWNER_KEY_PATTERN = /^[0-9a-f]{64}$/i;

interface DeleteReportData {
  reportId?: string;
  ownerKey?: string;
}

function hasMunicipalHistory(
  report: FirebaseFirestore.DocumentData
): boolean {
  const workflow = report.municipalWorkflow;

  return Boolean(
    workflow?.updatedAt ||
      (workflow?.status && workflow.status !== "NEW") ||
      (typeof workflow?.institutionalNote === "string" &&
        workflow.institutionalNote.trim())
  );
}

/**
 * Decide sul backend se una segnalazione eliminata dall'autore debba
 * restare nello storico amministrativo.
 *
 * La decisione non può essere affidata alla copia client, che potrebbe non
 * contenere ancora l'ultimo aggiornamento pubblicato dal Comune.
 */
export const deleteReportByAuthor = onCall<DeleteReportData>(
  {region: "europe-west1"},
  async (request) => {
    const reportId = request.data?.reportId;
    const ownerKey = request.data?.ownerKey;

    if (
      typeof reportId !== "string" ||
      !REPORT_ID_PATTERN.test(reportId)
    ) {
      throw new HttpsError(
        "invalid-argument",
        "Identificativo segnalazione non valido."
      );
    }

    const reportRef = adminDb.collection("reports").doc(reportId);
    const result = await adminDb.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(reportRef);

      if (!snapshot.exists) {
        return {archived: false, missing: true};
      }

      const report = snapshot.data() ?? {};
      const isAuthenticatedOwner =
        Boolean(request.auth?.uid) &&
        report.userId === request.auth?.uid;
      const isAnonymousOwner =
        typeof ownerKey === "string" &&
        OWNER_KEY_PATTERN.test(ownerKey) &&
        report.authorConfirmationKey === ownerKey;

      if (!isAuthenticatedOwner && !isAnonymousOwner) {
        throw new HttpsError(
          "permission-denied",
          "Solo l'autore può eliminare la segnalazione."
        );
      }

      if (!hasMunicipalHistory(report)) {
        return {archived: false, missing: false};
      }

      transaction.update(reportRef, {
        isVisible: false,
        archivedForMunicipality: true,
        deletedByAuthorAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      return {archived: true, missing: false};
    });

    return result;
  }
);
