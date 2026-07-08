import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";

/**
 * Rileva contenuti composti esclusivamente
 * da emoji.
 *
 * Ogni riga del contenuto viene analizzata
 * separatamente, così da gestire correttamente
 * titolo e descrizione.
 */
export class EmojiOnlyRule
  implements QualityRule
{
  /**
   * Espressione regolare Unicode che verifica
   * se una riga contiene esclusivamente emoji
   * e spazi.
   *
   * Include anche:
   * - Emoji Presentation
   * - Variation Selector-16
   * - Zero Width Joiner
   */
  private static readonly EMOJI_ONLY_REGEX =
    /^[\p{Extended_Pictographic}\p{Emoji_Presentation}\u200D\uFE0F\s]+$/u;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const righe = contenuto.testo!
      .split("\n")
      .map((riga) => riga.trim())
      .filter((riga) => riga.length > 0);

    for (const riga of righe) {
      if (
        EmojiOnlyRule.EMOJI_ONLY_REGEX.test(
          riga
        )
      ) {
        return [
          new ModerationEvidence(
            "SOLO_EMOJI",
            "Il contenuto è composto esclusivamente da emoji.",
            1,
            "TESTO"
          ),
        ];
      }
    }

    return [];
  }
}