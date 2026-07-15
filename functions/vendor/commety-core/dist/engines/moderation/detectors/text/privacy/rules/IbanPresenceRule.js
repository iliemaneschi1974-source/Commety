"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IbanPresenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di un codice IBAN
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class IbanPresenceRule {
    /**
     * Espressione regolare utilizzata per
     * individuare codici IBAN.
     *
     * Non viene eseguita la validazione
     * formale dell'IBAN.
     */
    static IBAN_REGEX = /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/iu;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo.replace(/\s+/g, "");
        if (!IbanPresenceRule.IBAN_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "Rilevata la presenza di un codice IBAN nel contenuto.", 1.0, "TESTO"),
        ];
    }
}
exports.IbanPresenceRule = IbanPresenceRule;
//# sourceMappingURL=IbanPresenceRule.js.map