"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PornographyRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di contenuti
 * pornografici in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class PornographyRule {
    /**
     * Soglia minima oltre la quale il contenuto
     * viene considerato pornografico.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.pornografia < PornographyRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("IMMAGINE_PORNOGRAFICA", "Rilevato contenuto pornografico nell'immagine.", analisi.pornografia, "IMMAGINE"),
        ];
    }
}
exports.PornographyRule = PornographyRule;
//# sourceMappingURL=PornographyRule.js.map