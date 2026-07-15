"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildSafetyRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di contenuti che
 * coinvolgono minori e richiedono
 * particolare attenzione.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class ChildSafetyRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * meritevole di moderazione.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.childSafety < ChildSafetyRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("MINORI_RILEVATI", "Rilevata la possibile presenza di minori in un contenuto che richiede moderazione.", analisi.childSafety, "IMMAGINE"),
        ];
    }
}
exports.ChildSafetyRule = ChildSafetyRule;
//# sourceMappingURL=ChildSafetyRule.js.map