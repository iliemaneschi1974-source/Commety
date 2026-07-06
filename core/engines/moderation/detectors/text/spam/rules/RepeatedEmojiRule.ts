import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la ripetizione consecutiva della stessa emoji
 * all'interno del testo.
 *
 * Esempi:
 *
 * 😂😂😂😂😂😂
 * 🔥🔥🔥🔥🔥🔥
 * ❤️❤️❤️❤️❤️❤️
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export class RepeatedEmojiRule implements SpamRule {
  /**
   * Numero minimo di emoji consecutive uguali
   * necessario per produrre un'evidenza.
   */
  private static readonly MINIMO_EMOJI_CONSECUTIVE = 6;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const emoji = contenuto.testo!.match(/\p{Extended_Pictographic}/gu);

    if (emoji === null || emoji.length === 0) {
      return [];
    }

    let ultimaEmoji = "";
    let consecutive = 0;

    for (const corrente of emoji) {
      if (corrente === ultimaEmoji) {
        consecutive++;

        if (
          consecutive >=
          RepeatedEmojiRule.MINIMO_EMOJI_CONSECUTIVE
        ) {
          return [
            new ModerationEvidence(
              "EMOJI_RIPETUTE",
              "Rilevata una sequenza eccessiva di emoji consecutive.",
              1,
              "TESTO"
            ),
          ];
        }
      } else {
        ultimaEmoji = corrente;
        consecutive = 1;
      }
    }

    return [];
  }
}