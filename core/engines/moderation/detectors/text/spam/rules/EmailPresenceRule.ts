import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la presenza di uno o più indirizzi
 * email all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class EmailPresenceRule implements SpamRule {
  /**
   * Espressione regolare utilizzata per
   * individuare indirizzi email nel testo.
   */
  private static readonly EMAIL_REGEX =
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    if (!EmailPresenceRule.EMAIL_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "DATI_PERSONALI_RILEVATI",
        "Rilevata la presenza di uno o più indirizzi email nel contenuto.",
        1.0,
        "TESTO"
      ),
    ];
  }
}