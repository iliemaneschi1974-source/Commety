import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";

/**
 * Verifica che titolo e descrizione
 * abbiano una lunghezza minima.
 *
 * Questa regola osserva esclusivamente
 * la struttura della segnalazione e non
 * il suo contenuto semantico.
 */
export class MinimumLengthRule
  implements QualityRule
{
  /**
   * Lunghezza minima del titolo.
   */
  private static readonly MIN_TITLE_LENGTH = 3;

  /**
   * Lunghezza minima della descrizione.
   */
  private static readonly MIN_DESCRIPTION_LENGTH = 10;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (
      contenuto.hasTitolo() &&
      contenuto.titolo!.trim().length <
        MinimumLengthRule.MIN_TITLE_LENGTH
    ) {
      return [
        new ModerationEvidence(
          "TESTO_TROPPO_BREVE",
          "Il titolo è troppo breve.",
          1,
          "TESTO"
        ),
      ];
    }

    if (
      contenuto.hasDescrizione() &&
      contenuto.descrizione!.trim().length <
        MinimumLengthRule.MIN_DESCRIPTION_LENGTH
    ) {
      return [
        new ModerationEvidence(
          "TESTO_TROPPO_BREVE",
          "La descrizione è troppo breve.",
          1,
          "TESTO"
        ),
      ];
    }

    return [];
  }
}