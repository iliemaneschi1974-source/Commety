import { FieldValue } from "firebase-admin/firestore";

import { ModerationResult } from "@commety/core";

import { adminDb } from "../config/firebaseAdmin";

/**
 * Responsabile del salvataggio
 * del risultato della moderazione.
 *
 * La classe si occupa esclusivamente
 * della persistenza su Firestore.
 */
export class ReportModerationUpdater {

  /**
   * Salva il risultato della moderazione
   * all'interno della segnalazione.
   */
  async save(
    reportId: string,
    result: ModerationResult
  ): Promise<void> {

    await adminDb
      .collection("reports")
      .doc(reportId)
      .update({

        moderation: {

  decision: result.decision.value,

  evidences: result.evidences.map(
    (evidence) => ({
      type: evidence.tipo,
      description: evidence.descrizione,
      confidence: evidence.confidenza,
      source: evidence.origine,
    })
  ),

  analyzedAt:
    FieldValue.serverTimestamp(),

},

      });

  }

}