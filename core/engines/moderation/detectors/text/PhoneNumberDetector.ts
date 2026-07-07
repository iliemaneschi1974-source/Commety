import { ModerationEvidence } from "@/core/engines/moderation/ModerationEvidence";

import { TextDetector } from "./TextDetector";

/**
 * Detector specializzato nel rilevamento
 * di numeri di telefono all'interno del testo.
 */
export class PhoneNumberDetector implements TextDetector {
  /**
   * Espressione regolare semplificata per il
   * rilevamento dei numeri di telefono.
   *
   * Potrà essere raffinata negli sprint futuri.
   */
  private static readonly PHONE_REGEX =
    /\b(?:\+?\d{1,3}[\s-]?)?(?:\d[\s-]?){8,14}\b/;

  analizza(
    testo: string
  ): readonly ModerationEvidence[] {
    if (!PhoneNumberDetector.PHONE_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "DATI_PERSONALI_RILEVATI",
        "È stato rilevato almeno un numero di telefono nel testo.",
        1,
        "TESTO"
      ),
    ];
  }
}