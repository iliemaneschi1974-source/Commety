"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoreRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di contenuti
 * particolarmente cruenti in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class GoreRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * particolarmente cruento.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.gore < GoreRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("IMMAGINE_CRUENTA", "Rilevato contenuto particolarmente cruento nell'immagine.", analisi.gore, "IMMAGINE"),
        ];
    }
}
exports.GoreRule = GoreRule;
//# sourceMappingURL=GoreRule.js.map