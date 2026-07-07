import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AdvertisingPatternRule } from "./rules/AdvertisingPatternRule";
import { EmailPresenceRule } from "./rules/EmailPresenceRule";
import { KeywordSpamRule } from "./rules/KeywordSpamRule";
import { PhoneNumberPresenceRule } from "./rules/PhoneNumberPresenceRule";
import { RepeatedCharactersRule } from "./rules/RepeatedCharactersRule";
import { RepeatedEmojiRule } from "./rules/RepeatedEmojiRule";
import { RepeatedWordsRule } from "./rules/RepeatedWordsRule";
import { SpamRule } from "./SpamRule";
import { UppercaseRule } from "./rules/UppercaseRule";
import { UrlPresenceRule } from "./rules/UrlPresenceRule";

/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Spam.
 */
export class SpamDetector {
  private readonly rules: readonly SpamRule[] = [
    new RepeatedCharactersRule(),
    new RepeatedWordsRule(),
    new RepeatedEmojiRule(),
    new UppercaseRule(),
    new AdvertisingPatternRule(),
    new UrlPresenceRule(),
    new EmailPresenceRule(),
    new PhoneNumberPresenceRule(),
    new KeywordSpamRule(),
  ];

  /**
   * Analizza il contenuto utilizzando tutte
   * le regole della famiglia Spam.
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