"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponRule = void 0;
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
const AbstractSafetyImageRule_1 = require("./AbstractSafetyImageRule");
/**
 * Rileva la presenza di armi
 * nelle immagini.
 */
class WeaponRule extends AbstractSafetyImageRule_1.AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di armi rilevate.
     */
    valore(analisi) {
        return analisi.armi;
    }
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    soglia() {
        return ImageModerationThresholds_1.ImageModerationThresholds.ARMI;
    }
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    tipo() {
        return "ARMI_RILEVATE";
    }
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    descrizione() {
        return "Armi rilevate.";
    }
}
exports.WeaponRule = WeaponRule;
//# sourceMappingURL=WeaponRule.js.map