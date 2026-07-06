import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";

/**
 * Rileva la presenza di uno o più numeri
 * di telefono all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class PhoneNumberPresenceRule implements SpamRule {
  /**
   * Espressione regolare utilizzata per
   * individuare numeri di telefono.
   */
  private static readonly PHONE_REGEX =
    /\b(?:\+?\d{1,3}[\s-]?)?(?:\d[\s-]?){8,14}\b/u;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    if (!PhoneNumberPresenceRule.PHONE_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "NUMERO_TELEFONICO_PRESENTE",
        "Rilevata la presenza di uno o più numeri di telefono nel contenuto.",
        1.0,
        "TESTO"
      ),
    ];
  }
}