"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NudityRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la presenza di nudità
 * nelle immagini.
 */
class NudityRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di nudità rilevata.
     */
    valore(analisi) {
        return analisi.nudita;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        return ImageModerationThresholds_1.ImageModerationThresholds.NUDITA;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "IMMAGINE_CON_NUDITA";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Nudità rilevata.";
    }
}
exports.NudityRule = NudityRule;
//# sourceMappingURL=NudityRule.js.map