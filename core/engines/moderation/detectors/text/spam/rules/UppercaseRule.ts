import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva un utilizzo eccessivo di lettere maiuscole
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export class UppercaseRule implements SpamRule {
  /**
   * Percentuale minima di lettere maiuscole
   * necessaria per produrre un'evidenza.
   */
  private static readonly PERCENTUALE_MINIMA = 0.8;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    let lettere = 0;
    let maiuscole = 0;

    for (const carattere of testo) {
      if (/[A-Za-zÀ-ÖØ-Þà-öø-ÿ]/u.test(carattere)) {
        lettere++;

        if (carattere === carattere.toUpperCase()) {
          maiuscole++;
        }
      }
    }

    if (lettere === 0) {
      return [];
    }

    const percentuale = maiuscole / lettere;

    if (percentuale >= UppercaseRule.PERCENTUALE_MINIMA) {
      return [
        new ModerationEvidence(
          "MAIUSCOLO_ECCESSIVO",
          "Rilevato un utilizzo eccessivo di lettere maiuscole.",
          percentuale,
          "TESTO"
        ),
      ];
    }

    return [];
  }
}