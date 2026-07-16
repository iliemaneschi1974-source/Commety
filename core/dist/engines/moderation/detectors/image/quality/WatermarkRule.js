"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatermarkRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva la presenza di watermark
 * all'interno delle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class WatermarkRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.watermark < ImageModerationThresholds_1.ImageModerationThresholds.WATERMARK) {
            return [];
        }
        return [
            this.creaEvidence("WATERMARK", "Watermark chiaramente visibile rilevato.", analisi.watermark)
        ];
    }
}
exports.WatermarkRule = WatermarkRule;
//# sourceMappingURL=WatermarkRule.js.map