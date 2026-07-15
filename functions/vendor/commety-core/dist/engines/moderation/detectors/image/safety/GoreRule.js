"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoreRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la presenza di sangue
 * o contenuti particolarmente cruenti.
 */
class GoreRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di contenuti cruenti rilevati.
     */
    valore(analisi) {
        return analisi.gore;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        return ImageModerationThresholds_1.ImageModerationThresholds.GORE;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "IMMAGINE_CRUENTA";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Contenuto cruento rilevato.";
    }
}
exports.GoreRule = GoreRule;
//# sourceMappingURL=GoreRule.js.map