import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la presenza di espressioni tipicamente
 * utilizzate in contenuti pubblicitari o promozionali.
 *
 * La regola osserva esclusivamente il linguaggio
 * utilizzato e non prende decisioni sul contenuto.
 */
export class AdvertisingPatternRule implements SpamRule {
  /**
   * Pattern linguistici comunemente presenti
   * nei contenuti promozionali.
   */
  private static readonly PATTERN: readonly string[] = [
    "clicca qui",
    "offerta imperdibile",
    "offerta limitata",
    "guadagna subito",
    "guadagno garantito",
    "solo oggi",
    "scrivimi in privato",
    "contattami in privato",
    "link in bio",
    "entra nel gruppo",
    "iscriviti ora",
    "telegram",
    "whatsapp",
    "promo",
    "promozione",
  ];

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.toLowerCase();

    let patternTrovati = 0;

    for (const pattern of AdvertisingPatternRule.PATTERN) {
      if (testo.includes(pattern)) {
        patternTrovati++;
      }
    }

    if (patternTrovati === 0) {
      return [];
    }

    const confidenza =
      patternTrovati >= 3
        ? 1.0
        : 0.8 + ((patternTrovati - 1) * 0.1);

    return [
      new ModerationEvidence(
        "PUBBLICITA",
        "Rilevati pattern tipici di contenuto promozionale.",
        confidenza,
        "TESTO"
      ),
    ];
  }
}