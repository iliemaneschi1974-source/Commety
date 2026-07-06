import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";

/**
 * Rileva la presenza di un numero di carta
 * di pagamento all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class PaymentCardPresenceRule implements SpamRule {
  /**
   * Espressione regolare utilizzata per
   * individuare numeri di carte di pagamento.
   *
   * Supporta numeri continui oppure separati
   * da spazi o trattini.
   *
   * Non viene eseguita la validazione
   * dell'algoritmo di Luhn.
   */
  private static readonly PAYMENT_CARD_REGEX =
    /\b(?:\d{4}[- ]?){3}\d{4}\b/u;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const testo = contenuto.testo!;

    if (
      !PaymentCardPresenceRule.PAYMENT_CARD_REGEX.test(testo)
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "CARTA_PAGAMENTO_PRESENTE",
        "Rilevata la presenza di un numero di carta di pagamento nel contenuto.",
        1.0,
        "TESTO"
      ),
    ];
  }
}