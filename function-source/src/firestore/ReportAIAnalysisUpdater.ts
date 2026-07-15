import { FieldValue } from "firebase-admin/firestore";

import { OpenAIImageAnalysisResponse } from "../ai/dto/OpenAIImageAnalysisResponse";
import { adminDb } from "../config/firebaseAdmin";

/**
 * Responsabile del salvataggio
 * dell'analisi AI della segnalazione.
 *
 * La classe si occupa esclusivamente
 * della persistenza su Firestore.
 */
export class ReportAIAnalysisUpdater {

  /**
   * Salva l'analisi AI
   * all'interno della segnalazione.
   */
  async save(
    reportId: string,
    analysis: OpenAIImageAnalysisResponse,
    processingTimeMs: number
  ): Promise<void> {

    await adminDb
      .collection("reports")
      .doc(reportId)
      .update({

        ai: {

          provider: "openai",

          model: "gpt-5-mini",

          version: 1,

          status: "COMPLETED",

          processingTimeMs,

          analyzedAt: FieldValue.serverTimestamp(),

          analysis,

        },

      });

  }

}