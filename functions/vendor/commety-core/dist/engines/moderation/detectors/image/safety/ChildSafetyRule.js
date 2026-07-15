"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildSafetyRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la possibile presenza
 * di contenuti che coinvolgono minori
 * e richiedono moderazione.
 */
class ChildSafetyRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * rilevata dall'Image Analysis Engine.
     */
    valore(analisi) {
        return analisi.childSafety;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        // Al momento riutilizziamo la soglia della pornografia.
        // Se in futuro servirà una soglia dedicata, sarà sufficiente
        // aggiungerla a ImageModerationThresholds senza modificare
        // questa Rule.
        return ImageModerationThresholds_1.ImageModerationThresholds.PORNOGRAFIA;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "MINORI_RILEVATI";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Possibile coinvolgimento di minori rilevato.";
    }
}
exports.ChildSafetyRule = ChildSafetyRule;
//# sourceMappingURL=ChildSafetyRule.js.map