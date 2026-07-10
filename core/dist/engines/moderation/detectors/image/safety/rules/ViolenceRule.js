"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di contenuti
 * violenti in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class ViolenceRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * violento.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.violenza < ViolenceRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("IMMAGINE_VIOLENTA", "Rilevato contenuto violento nell'immagine.", analisi.violenza, "IMMAGINE"),
        ];
    }
}
exports.ViolenceRule = ViolenceRule;
//# sourceMappingURL=ViolenceRule.js.map