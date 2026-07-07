import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";

/**
 * Rileva la presenza di un codice IBAN
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class IbanPresenceRule implements SpamRule {
  /**
   * Espressione regolare utilizzata per
   * individuare codici IBAN.
   *
   * Non viene eseguita la validazione
   * formale dell'IBAN.
   */
  private static readonly IBAN_REGEX =
    /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/iu;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!.replace(/\s+/g, "");

    if (!IbanPresenceRule.IBAN_REGEX.test(testo)) {
      return [];
    }

    return [
      new ModerationEvidence(
        "DATI_PERSONALI_RILEVATI",
        "Rilevata la presenza di un codice IBAN nel contenuto.",
        1.0,
        "TESTO"
      ),
    ];
  }
}