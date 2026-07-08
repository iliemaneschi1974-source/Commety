import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";

import { EmojiOnlyRule } from "./rules/EmojiOnlyRule";
import { GibberishRule } from "./rules/GibberishRule";
import { PunctuationOnlyRule } from "./rules/PunctuationOnlyRule";
import { TooShortTextRule } from "./rules/TooShortTextRule";
import { QualityRule } from "./QualityRule";

/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Quality.
 */
export class QualityDetector {
  private readonly rules: readonly QualityRule[] = [
    new TooShortTextRule(),
    new PunctuationOnlyRule(),
    new EmojiOnlyRule(),
    new GibberishRule(),
  ];

  /**
   * Analizza il contenuto utilizzando tutte
   * le regole della famiglia Quality.
   */
  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    const evidenze: ModerationEvidence[] = [];

    for (const rule of this.rules) {
      evidenze.push(...rule.analizza(contenuto));
    }

    return evidenze;
  }
}