import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";

/**
 * Rileva testi palesemente privi di significato.
 *
 * La regola utilizza semplici euristiche
 * deterministiche, senza ricorrere ad AI.
 */
export class GibberishRule
  implements QualityRule
{
  private static readonly VOWELS =
    /[aeiouàèéìòóù]/i;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const parole = contenuto.testo!
      .trim()
      .split(/\s+/)
      .filter((p) => p.length >= 5);

    if (parole.length < 2) {
      return [];
    }

    const tutteSenzaVocali =
      parole.every(
        (parola) =>
          !GibberishRule.VOWELS.test(parola)
      );

    if (!tutteSenzaVocali) {
      return [];
    }

    return [
      new ModerationEvidence(
        "TESTO_NON_SIGNIFICATIVO",
        "Il testo sembra privo di significato.",
        0.95,
        "TESTO"
      ),
    ];
  }
}