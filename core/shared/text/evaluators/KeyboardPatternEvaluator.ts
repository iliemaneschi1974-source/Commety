import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * KeyboardPatternEvaluator
 *
 * Rileva sequenze tipiche della tastiera utilizzate
 * frequentemente come testo casuale durante test,
 * spam o contenuti privi di significato.
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
export class KeyboardPatternEvaluator
  implements TextQualityEvaluator
{
  /**
   * Sequenze tipiche della tastiera.
   *
   * L'elenco potrà essere ampliato senza
   * modificare l'algoritmo.
   */
  private static readonly PATTERNS = [
    "asdf",
    "qwert",
    "zxcv",
    "poiuy",
    "lkjh",
    "mnbv",
    "hjkl",
    "wert",
    "xcvb",
  ];

  evaluate(
    testo: string
  ): TextQualityContribution {
    const parole = testo
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    for (const parola of parole) {
      const trovato =
        KeyboardPatternEvaluator.PATTERNS.some(
          (pattern) =>
            parola.includes(pattern)
        );

      if (trovato) {
        return new TextQualityContribution(
          "KeyboardPatternEvaluator",
          5,
          `La parola "${parola}" contiene una sequenza tipica della tastiera.`
        );
      }
    }

    return new TextQualityContribution(
      "KeyboardPatternEvaluator",
      0,
      "Nessuna sequenza tipica della tastiera rilevata."
    );
  }
}