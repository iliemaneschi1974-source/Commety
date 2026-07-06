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
   * Elenco iniziale dei termini volgari.
   */
  private static readonly PAROLACCE: readonly string[] = [
    "cazzo",
    "merda",
    "vaffanculo",
    "stronzo",
    "coglione",
  ];

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.toLowerCase();

    let rilevate = 0;

    for (const parola of ParolacceRule.PAROLACCE) {
      const regex = new RegExp(`\\b${parola}\\b`, "iu");

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