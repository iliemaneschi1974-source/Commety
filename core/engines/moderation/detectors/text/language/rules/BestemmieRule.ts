import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";

/**
 * Rileva la presenza di bestemmie
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class BestemmieRule implements SpamRule {
  /**
   * Elenco iniziale delle bestemmie.
   *
   * L'elenco è volutamente ridotto e potrà
   * essere ampliato nel tempo.
   */
  private static readonly BESTEMMIE: readonly string[] = [
    // I riferimenti singoli sono vietati per mantenere il linguaggio pubblico rispettoso.
    "dio",
    "madonna",
    "gesu",
    "gesù",
    "cristo",
    "porco dio",
    "porca madonna",
    "dio cane",
    "dio porco",
    "cristo cane",
  ];

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .toLowerCase();

    let rilevate = 0;

    for (const bestemmia of BestemmieRule.BESTEMMIE) {
      const regex = new RegExp(`\\b${bestemmia}\\b`, "iu");

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
        "BESTEMMIE",
        "Rilevato linguaggio blasfemo nel contenuto.",
        confidenza,
        "TESTO"
      ),
    ];
  }
}
