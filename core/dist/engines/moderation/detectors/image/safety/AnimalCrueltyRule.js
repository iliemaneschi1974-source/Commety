"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalCrueltyRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la presenza di possibili
 * maltrattamenti verso animali.
 */
class AnimalCrueltyRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di maltrattamento rilevata.
     */
    valore(analisi) {
        return analisi.animalCruelty;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        return ImageModerationThresholds_1.ImageModerationThresholds.ANIMAL_CRUELTY;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "MALTRATTAMENTO_ANIMALI";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Possibile maltrattamento di animali rilevato.";
    }
}
exports.AnimalCrueltyRule = AnimalCrueltyRule;
//# sourceMappingURL=AnimalCrueltyRule.js.map