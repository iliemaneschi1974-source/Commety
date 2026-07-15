"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicensePlateRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva la presenza di una o più
 * targhe di veicoli nelle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class LicensePlateRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.targhe < ImageModerationThresholds_1.ImageModerationThresholds.TARGHE) {
            return [];
        }
        return [
            this.creaEvidence("TARGA_RILEVATA", "Targa chiaramente leggibile rilevata.", analisi.targhe)
        ];
    }
}
exports.LicensePlateRule = LicensePlateRule;
//# sourceMappingURL=LicensePlateRule.js.map