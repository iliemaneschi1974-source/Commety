"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva la presenza di meme
 * all'interno delle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class MemeRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.meme < ImageModerationThresholds_1.ImageModerationThresholds.MEME) {
            return [];
        }
        return [
            this.creaEvidence("MEME", "Meme rilevato.", analisi.meme)
        ];
    }
}
exports.MemeRule = MemeRule;
//# sourceMappingURL=MemeRule.js.map