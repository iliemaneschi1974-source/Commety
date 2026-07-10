"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimumLengthRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Verifica che titolo e descrizione
 * abbiano una lunghezza minima.
 *
 * Questa regola osserva esclusivamente
 * la struttura della segnalazione e non
 * il suo contenuto semantico.
 */
class MinimumLengthRule {
    /**
     * Lunghezza minima del titolo.
     */
    static MIN_TITLE_LENGTH = 3;
    /**
     * Lunghezza minima della descrizione.
     */
    static MIN_DESCRIPTION_LENGTH = 10;
    analizza(contenuto) {
        if (contenuto.hasTitolo() &&
            contenuto.titolo.trim().length <
                MinimumLengthRule.MIN_TITLE_LENGTH) {
            return [
                new ModerationEvidence_1.ModerationEvidence("TESTO_TROPPO_BREVE", "Il titolo è troppo breve.", 1, "TESTO"),
            ];
        }
        if (contenuto.hasDescrizione() &&
            contenuto.descrizione.trim().length <
                MinimumLengthRule.MIN_DESCRIPTION_LENGTH) {
            return [
                new ModerationEvidence_1.ModerationEvidence("TESTO_TROPPO_BREVE", "La descrizione è troppo breve.", 1, "TESTO"),
            ];
        }
        return [];
    }
}
exports.MinimumLengthRule = MinimumLengthRule;
//# sourceMappingURL=MinimumLengthRule.js.map