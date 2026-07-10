"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NudityRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di nudità
 * all'interno di un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class NudityRule {
    /**
     * Soglia minima oltre la quale
     * la nudità viene considerata rilevante.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.nudita < NudityRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("IMMAGINE_CON_NUDITA", "Rilevata nudità nell'immagine.", analisi.nudita, "IMMAGINE"),
        ];
    }
}
exports.NudityRule = NudityRule;
//# sourceMappingURL=NudityRule.js.map