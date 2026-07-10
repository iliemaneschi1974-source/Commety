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
export declare class PaymentCardPresenceRule implements SpamRule {
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
    private static readonly PAYMENT_CARD_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=PaymentCardPresenceRule.d.ts.map