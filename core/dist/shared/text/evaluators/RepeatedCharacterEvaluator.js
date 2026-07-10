"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatedCharacterEvaluator = void 0;
const TextQualityContribution_1 = require("../TextQualityContribution");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RepeatedCharacterEvaluator
 *
 * Rileva parole composte dallo stesso carattere
 * ripetuto molte volte.
 *
 * Esempi:
 *
 * aaaaaaa
 * bbbbbbbb
 * zzzzzzzz
 * !!!!!!!
 * 11111111
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
class RepeatedCharacterEvaluator {
    /**
     * Stesso carattere ripetuto
     * almeno 5 volte consecutivamente.
     */
    static PATTERN = /^(.)\1{4,}$/;
    evaluate(testo) {
        const parole = testo
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        for (const parola of parole) {
            if (RepeatedCharacterEvaluator.PATTERN.test(parola)) {
                return new TextQualityContribution_1.TextQualityContribution("RepeatedCharacterEvaluator", 3, `La parola "${parola}" è composta dallo stesso carattere ripetuto.`);
            }
        }
        return new TextQualityContribution_1.TextQualityContribution("RepeatedCharacterEvaluator", 0, "Nessuna ripetizione anomala di caratteri.");
    }
}
exports.RepeatedCharacterEvaluator = RepeatedCharacterEvaluator;
//# sourceMappingURL=RepeatedCharacterEvaluator.js.map