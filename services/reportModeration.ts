import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

/**
 * ============================================================================
 * REPORT MODERATION SERVICE
 * ----------------------------------------------------------------------------
 *
 * Responsabile dell'ascolto realtime
 * del risultato della moderazione
 * di una segnalazione.
 *
 * Isola completamente Firestore
 * dal resto dell'applicazione.
 * ============================================================================
 */

/**
 * Decisioni possibili della moderazione.
 */
export type ReportModerationDecision =
  | "APPROVATO"
  | "RIFIUTATO"
  | "LIMITATO"
  | "REVISIONE_MANUALE";

/**
 * Evento restituito dal servizio.
 */
export interface ReportModerationEvent {

  /**
   * Decisione della moderazione.
   */
  decision: ReportModerationDecision;

  evidences: Array<{
    type?: string;
    description?: string;
  }>;

}

/**
 * Avvia l'ascolto realtime della moderazione.
 *
 * Il callback viene invocato solamente
 * quando la moderazione è disponibile.
 *
 * Restituisce la funzione di unsubscribe.
 */
export function listenModerationDecision(
  reportId: string,
  callback: (
    event: ReportModerationEvent
  ) => void
): () => void {

  return onSnapshot(
    doc(db, "reports", reportId),
    (snapshot) => {

      if (!snapshot.exists()) {
        return;
      }

      const data = snapshot.data();

      const decision =
        data?.moderation?.decision;

      if (!decision) {
        return;
      }

      callback({
        decision:
          decision as ReportModerationDecision,
        evidences: Array.isArray(data?.moderation?.evidences)
          ? data.moderation.evidences
          : [],
      });

    }
  );

}
