import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";

/**
 * Rileva contenuti composti esclusivamente
 * da segni di punteggiatura.
 */
export class PunctuationOnlyRule
  implements QualityRule
{
  /**
   * Verifica che il contenuto sia composto
   * esclusivamente da punteggiatura e spazi.
   */
  private static readonly PUNCTUATION_REGEX =
    /^[\p{P}\s]+$/u;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.trim();

    if (testo.length === 0) {
      return [];
    }

    if (
      !PunctuationOnlyRule.PUNCTUATION_REGEX.test(
        testo
      )
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "SOLO_PUNTEGGIATURA",
        "Il contenuto è composto esclusivamente da segni di punteggiatura.",
        1,
        "TESTO"
      ),
    ];
  }
}