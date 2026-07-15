"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberDetector = void 0;
const ModerationEvidence_1 = require("../../ModerationEvidence");
/**
 * Detector specializzato nel rilevamento
 * di numeri di telefono all'interno del testo.
 */
class PhoneNumberDetector {
    /**
     * Espressione regolare semplificata per il
     * rilevamento dei numeri di telefono.
     *
     * Potrà essere raffinata negli sprint futuri.
     */
    static PHONE_REGEX = /\b(?:\+?\d{1,3}[\s-]?)?(?:\d[\s-]?){8,14}\b/;
    analizza(testo) {
        if (!PhoneNumberDetector.PHONE_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "È stato rilevato almeno un numero di telefono nel testo.", 1, "TESTO"),
        ];
    }
}
exports.PhoneNumberDetector = PhoneNumberDetector;
//# sourceMappingURL=PhoneNumberDetector.js.map