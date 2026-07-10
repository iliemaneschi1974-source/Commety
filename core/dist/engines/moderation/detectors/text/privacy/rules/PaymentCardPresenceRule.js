"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCardPresenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di un numero di carta
 * di pagamento all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class PaymentCardPresenceRule {
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
    static PAYMENT_CARD_REGEX = /\b(?:\d{4}[- ]?){3}\d{4}\b/u;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        if (!PaymentCardPresenceRule.PAYMENT_CARD_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "Rilevata la presenza di un numero di carta di pagamento nel contenuto.", 1.0, "TESTO"),
        ];
    }
}
exports.PaymentCardPresenceRule = PaymentCardPresenceRule;
//# sourceMappingURL=PaymentCardPresenceRule.js.map