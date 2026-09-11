import { doc, onSnapshot } from "firebase/firestore";

import { db } from "@/lib/firebase";

export type ReportModerationDecision =
  | "APPROVATO"
  | "RIFIUTATO"
  | "LIMITATO"
  | "REVISIONE_MANUALE";

export interface ReportModerationEvent {
  decision: ReportModerationDecision;
  evidences: Array<{
    type?: string;
    description?: string;
  }>;
}

export type ReportModerationListenerError =
  | "MEDIA_PROCESSING_FAILED"
  | "LISTENER_FAILED";

/**
 * Ascolta sia la decisione sia gli stati terminali di errore della pipeline.
 */
export function listenModerationDecision(
  reportId: string,
  callback: (event: ReportModerationEvent) => void,
  onError?: (reason: ReportModerationListenerError) => void
): () => void {
  return onSnapshot(
    doc(db, "reports", reportId),
    (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.data();

      if (data?.mediaPrivacy?.state === "FAILED") {
        onError?.("MEDIA_PROCESSING_FAILED");
        return;
      }

      const decision = data?.moderation?.decision;
      if (!decision) return;

      callback({
        decision: decision as ReportModerationDecision,
        evidences: Array.isArray(data?.moderation?.evidences)
          ? data.moderation.evidences
          : [],
      });
    },
    () => onError?.("LISTENER_FAILED")
  );
}
