import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";

/**
 * Rileva la presenza di termini volgari
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class ParolacceRule implements SpamRule {
  /**
   * Radici con le rispettive desinenze ammesse. In questo modo la
   * moderazione intercetta singolare, plurale e genere senza cercare
   * frammenti all'interno di parole non correlate.
   */
  private static readonly PAROLACCE: readonly {
    radice: string;
    desinenze: readonly string[];
  }[] = [
    { radice: "cazz", desinenze: ["o", "i"] },
    { radice: "merd", desinenze: ["a", "e"] },
    { radice: "vaffancul", desinenze: ["o"] },
    { radice: "stronz", desinenze: ["o", "a", "i", "e"] },
    { radice: "coglion", desinenze: ["e", "i"] },
  ];

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.toLowerCase();

    let rilevate = 0;

    for (const { radice, desinenze } of ParolacceRule.PAROLACCE) {
      const regex = new RegExp(
        `\\b${radice}(?:${desinenze.join("|")})\\b`,
        "iu"
      );

      if (regex.test(testo)) {
        rilevate++;
      }
    }

    if (rilevate === 0) {
      return [];
    }

    const confidenza =
      rilevate >= 3
        ? 1.0
        : rilevate === 2
          ? 0.85
          : 0.70;

    return [
      new ModerationEvidence(
        "PAROLACCE",
        "Rilevato linguaggio volgare nel contenuto.",
        confidenza,
        "TESTO"
      ),
    ];
  }
}
