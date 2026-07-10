"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberPresenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di uno o più numeri
 * di telefono all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class PhoneNumberPresenceRule {
    /**
     * Espressione regolare utilizzata per
     * individuare numeri di telefono.
     */
    static PHONE_REGEX = /\b(?:\+?\d{1,3}[\s-]?)?(?:\d[\s-]?){8,14}\b/u;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        if (!PhoneNumberPresenceRule.PHONE_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "Rilevata la presenza di uno o più numeri di telefono nel contenuto.", 1.0, "TESTO"),
        ];
    }
}
exports.PhoneNumberPresenceRule = PhoneNumberPresenceRule;
//# sourceMappingURL=PhoneNumberPresenceRule.js.map