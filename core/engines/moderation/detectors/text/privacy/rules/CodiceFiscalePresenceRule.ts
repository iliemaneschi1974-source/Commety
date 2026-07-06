import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";

/**
 * Rileva la presenza di un codice fiscale
 * italiano all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class CodiceFiscalePresenceRule implements SpamRule {
  /**
   * Espressione regolare utilizzata per
   * individuare codici fiscali italiani.
   *
   * Non viene eseguita la validazione
   * del carattere di controllo.
   */
  private static readonly CODICE_FISCALE_REGEX =
    /\b[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]\b/iu;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    if (
      !CodiceFiscalePresenceRule.CODICE_FISCALE_REGEX.test(testo)
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "CODICE_FISCALE_PRESENTE",
        "Rilevata la presenza di un codice fiscale nel contenuto.",
        1.0,
        "TESTO"
      ),
    ];
  }
}