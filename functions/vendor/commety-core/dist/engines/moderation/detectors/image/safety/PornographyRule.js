"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PornographyRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la presenza di contenuti
 * pornografici nelle immagini.
 */
class PornographyRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di pornografia rilevata.
     */
    valore(analisi) {
        return analisi.pornografia;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        return ImageModerationThresholds_1.ImageModerationThresholds.PORNOGRAFIA;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "IMMAGINE_PORNOGRAFICA";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Contenuto pornografico rilevato.";
    }
}
exports.PornographyRule = PornographyRule;
//# sourceMappingURL=PornographyRule.js.map