"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailPresenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di uno o più indirizzi
 * email all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class EmailPresenceRule {
    /**
     * Espressione regolare utilizzata per
     * individuare indirizzi email nel testo.
     */
    static EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/iu;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        if (!EmailPresenceRule.EMAIL_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("DATI_PERSONALI_RILEVATI", "Rilevata la presenza di uno o più indirizzi email nel contenuto.", 1.0, "TESTO"),
        ];
    }
}
exports.EmailPresenceRule = EmailPresenceRule;
//# sourceMappingURL=EmailPresenceRule.js.map