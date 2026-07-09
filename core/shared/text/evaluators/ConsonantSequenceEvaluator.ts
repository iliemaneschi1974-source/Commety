import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * ConsonantSequenceEvaluator
 *
 * Individua parole contenenti lunghe sequenze
 * di consonanti consecutive.
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
export class ConsonantSequenceEvaluator
  implements TextQualityEvaluator
{
  private static readonly CONSONANT_SEQUENCE =
    /[^aeiouàèéìòóù]{5,}/i;

  evaluate(
    testo: string
  ): TextQualityContribution {
    const parole = testo
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    for (const parola of parole) {
      if (parola.length < 5) {
        continue;
      }

      if (/\d/.test(parola)) {
        continue;
      }

      if (!/^[a-zàèéìòóù]+$/i.test(parola)) {
        continue;
      }

      if (
        ConsonantSequenceEvaluator.CONSONANT_SEQUENCE.test(
          parola
        )
      ) {
        return new TextQualityContribution(
          "ConsonantSequenceEvaluator",
          2,
          `La parola "${parola}" contiene una lunga sequenza di consonanti.`
        );
      }
    }

    return new TextQualityContribution(
      "ConsonantSequenceEvaluator",
      0,
      "Nessuna sequenza anomala di consonanti rilevata."
    );
  }
}