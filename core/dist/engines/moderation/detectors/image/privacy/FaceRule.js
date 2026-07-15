"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaceRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva la presenza di uno o più
 * volti riconoscibili nelle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class FaceRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.volti < ImageModerationThresholds_1.ImageModerationThresholds.VOLTI) {
            return [];
        }
        return [
            this.creaEvidence("VOLTO_RILEVATO", "Volto chiaramente riconoscibile rilevato.", analisi.volti)
        ];
    }
}
exports.FaceRule = FaceRule;
//# sourceMappingURL=FaceRule.js.map