import { ModerationEvidence } from "../../ModerationEvidence";

import { TextDetector } from "./TextDetector";

/**
 * Detector specializzato nel rilevamento
 * di URL all'interno del testo.
 */
export class UrlDetector implements TextDetector {
  /**
   * Espressione regolare semplificata per il
   * rilevamento degli URL.
   *
   * Potrà essere raffinata negli sprint futuri.
   */
  private static readonly URL_REGEX =
    /\b((https?:\/\/)|(www\.))?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?\b/;

  analizza(
    testo: string
  ): readonly ModerationEvidence[] {
    if (!UrlDetector.URL_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "LINK_MULTIPLI",
        "È stato rilevato almeno un URL nel testo.",
        1,
        "TESTO"
      ),
    ];
  }
}