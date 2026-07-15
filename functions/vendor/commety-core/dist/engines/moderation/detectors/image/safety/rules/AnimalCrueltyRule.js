"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalCrueltyRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di possibili
 * maltrattamenti nei confronti degli animali.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class AnimalCrueltyRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * meritevole di moderazione.
     */
    static SOGLIA = 0.80;
    analizza(analisi) {
        if (analisi.animalCruelty < AnimalCrueltyRule.SOGLIA) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("MALTRATTAMENTO_ANIMALI", "Rilevato possibile maltrattamento di animali nell'immagine.", analisi.animalCruelty, "IMMAGINE"),
        ];
    }
}
exports.AnimalCrueltyRule = AnimalCrueltyRule;
//# sourceMappingURL=AnimalCrueltyRule.js.map