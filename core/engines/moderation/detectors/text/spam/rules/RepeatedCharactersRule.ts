import { UserContent } from "../../../../../../domain/UserContent";
import {
  ModerationEvidence,
} from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva l'utilizzo eccessivo dello stesso carattere
 * consecutivo all'interno del testo.
 *
 * Esempi:
 *
 * "!!!!!!!!!!"
 * "AAAAAAAAAA"
 * ".........."
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export class RepeatedCharactersRule implements SpamRule {
  /**
   * Numero minimo di caratteri consecutivi uguali
   * necessario per produrre un'evidenza.
   */
  private static readonly MINIMO_CARATTERI_CONSECUTIVI = 6;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    let ultimoCarattere = "";
    let consecutivi = 0;

    for (const carattere of testo) {
      if (carattere === ultimoCarattere) {
        consecutivi++;

        if (
          consecutivi >=
          RepeatedCharactersRule.MINIMO_CARATTERI_CONSECUTIVI
        ) {
          return [
            new ModerationEvidence(
              "CARATTERI_RIPETUTI",
              "Rilevata una sequenza eccessiva di caratteri consecutivi.",
              1,
              "TESTO"
            ),
          ];
        }
      } else {
        ultimoCarattere = carattere;
        consecutivi = 1;
      }
    }

    return [];
  }
}