"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PunctuationOnlyRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva contenuti composti esclusivamente
 * da segni di punteggiatura.
 */
class PunctuationOnlyRule {
    /**
     * Verifica che il contenuto sia composto
     * esclusivamente da punteggiatura e spazi.
     */
    static PUNCTUATION_REGEX = /^[\p{P}\s]+$/u;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo.trim();
        if (testo.length === 0) {
            return [];
        }
        if (!PunctuationOnlyRule.PUNCTUATION_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("SOLO_PUNTEGGIATURA", "Il contenuto è composto esclusivamente da segni di punteggiatura.", 1, "TESTO"),
        ];
    }
}
exports.PunctuationOnlyRule = PunctuationOnlyRule;
//# sourceMappingURL=PunctuationOnlyRule.js.map