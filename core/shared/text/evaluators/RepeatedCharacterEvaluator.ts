import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RepeatedCharacterEvaluator
 *
 * Rileva parole composte dallo stesso carattere
 * ripetuto molte volte.
 *
 * Esempi:
 *
 * aaaaaaa
 * bbbbbbbb
 * zzzzzzzz
 * !!!!!!!
 * 11111111
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
export class RepeatedCharacterEvaluator
  implements TextQualityEvaluator
{
  /**
   * Stesso carattere ripetuto
   * almeno 5 volte consecutivamente.
   */
  private static readonly PATTERN =
    /^(.)\1{4,}$/;

  evaluate(
    testo: string
  ): TextQualityContribution {
    const parole = testo
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    for (const parola of parole) {
      if (
        RepeatedCharacterEvaluator.PATTERN.test(
          parola
        )
      ) {
        return new TextQualityContribution(
          "RepeatedCharacterEvaluator",
          3,
          `La parola "${parola}" è composta dallo stesso carattere ripetuto.`
        );
      }
    }

    return new TextQualityContribution(
      "RepeatedCharacterEvaluator",
      0,
      "Nessuna ripetizione anomala di caratteri."
    );
  }
}