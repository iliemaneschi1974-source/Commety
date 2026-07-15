"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailDetector = void 0;
const ModerationEvidence_1 = require("../../ModerationEvidence");
/**
 * Detector specializzato nel rilevamento
 * di indirizzi email all'interno del testo.
 */
class EmailDetector {
    /**
     * Espressione regolare semplificata per il
     * rilevamento degli indirizzi email.
     *
     * Potrà essere raffinata negli sprint futuri.
     */
    static EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
    analizza(testo) {
        if (!EmailDetector.EMAIL_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "È stato rilevato almeno un indirizzo email nel testo.", 1, "TESTO"),
        ];
    }
}
exports.EmailDetector = EmailDetector;
//# sourceMappingURL=EmailDetector.js.map