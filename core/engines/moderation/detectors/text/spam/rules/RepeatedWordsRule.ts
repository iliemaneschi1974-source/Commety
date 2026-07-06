import { UserContent } from "../../../../../../domain/UserContent";
import {
  ModerationEvidence,
} from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la ripetizione consecutiva della stessa parola
 * all'interno del testo.
 *
 * Esempi:
 *
 * "compra compra compra compra compra compra"
 * "ciao ciao ciao ciao ciao ciao"
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export class RepeatedWordsRule implements SpamRule {
  /**
   * Numero minimo di parole consecutive uguali
   * necessario per produrre un'evidenza.
   */
  private static readonly MINIMO_PAROLE_CONSECUTIVE = 6;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.toLowerCase();

    const parole = testo
      .split(/\s+/)
      .map(parola => parola.replace(/[^\p{L}\p{N}]/gu, ""))
      .filter(parola => parola.length > 0);

    let ultimaParola = "";
    let consecutive = 0;

    for (const parola of parole) {
      if (parola === ultimaParola) {
        consecutive++;

        if (
          consecutive >=
          RepeatedWordsRule.MINIMO_PAROLE_CONSECUTIVE
        ) {
          return [
            new ModerationEvidence(
              "PAROLE_RIPETUTE",
              "Rilevata una sequenza eccessiva di parole consecutive.",
              1,
              "TESTO"
            ),
          ];
        }
      } else {
        ultimaParola = parola;
        consecutive = 1;
      }
    }

    return [];
  }
}