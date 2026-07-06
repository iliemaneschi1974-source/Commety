import {
  ModerationEvidence,
  ModerationEvidenceSource,
} from "@/core/engines/moderation/ModerationEvidence";

import { TextDetector } from "./TextDetector";

/**
 * Detector specializzato nel rilevamento
 * di indirizzi email all'interno del testo.
 */
export class EmailDetector implements TextDetector {
  /**
   * Espressione regolare semplificata per il
   * rilevamento degli indirizzi email.
   *
   * Potrà essere raffinata negli sprint futuri.
   */
  private static readonly EMAIL_REGEX =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

  analizza(
    testo: string
  ): readonly ModerationEvidence[] {
    if (!EmailDetector.EMAIL_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "DATI_PERSONALI",
        "È stato rilevato almeno un indirizzo email nel testo.",
        1,
        "TESTO"
      ),
    ];
  }
}