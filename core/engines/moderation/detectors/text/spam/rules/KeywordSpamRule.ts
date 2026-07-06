import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la presenza di parole o espressioni
 * comunemente associate a contenuti spam.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class KeywordSpamRule implements SpamRule {
  /**
   * Parole chiave ed espressioni tipicamente
   * utilizzate nei contenuti spam.
   */
  private static readonly KEYWORDS: readonly string[] = [
    "bitcoin",
    "crypto",
    "forex",
    "casino",
    "scommesse",
    "trading",
    "investimento garantito",
    "guadagno facile",
    "referral",
    "multilevel",
  ];

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.toLowerCase();

    let paroleTrovate = 0;

    for (const keyword of KeywordSpamRule.KEYWORDS) {
      if (testo.includes(keyword)) {
        paroleTrovate++;
      }
    }

    if (paroleTrovate === 0) {
      return [];
    }

    const confidenza =
      paroleTrovate >= 3
        ? 1.0
        : paroleTrovate === 2
          ? 0.85
          : 0.70;

    return [
      new ModerationEvidence(
        "PAROLE_CHIAVE_SPAM",
        "Rilevate parole chiave tipicamente associate a contenuti spam.",
        confidenza,
        "TESTO"
      ),
    ];
  }
}