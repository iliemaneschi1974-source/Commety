"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolenceRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la presenza di contenuti
 * violenti nelle immagini.
 */
class ViolenceRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di violenza rilevata.
     */
    valore(analisi) {
        return analisi.violenza;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        return ImageModerationThresholds_1.ImageModerationThresholds.VIOLENZA;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "IMMAGINE_VIOLENTA";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Contenuto violento rilevato.";
    }
}
exports.ViolenceRule = ViolenceRule;
//# sourceMappingURL=ViolenceRule.js.map