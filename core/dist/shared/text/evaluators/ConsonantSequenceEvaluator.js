"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsonantSequenceEvaluator = void 0;
const TextQualityContribution_1 = require("../TextQualityContribution");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * ConsonantSequenceEvaluator
 *
 * Individua parole contenenti lunghe sequenze
 * di consonanti consecutive.
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
class ConsonantSequenceEvaluator {
    static CONSONANT_SEQUENCE = /[^aeiouàèéìòóù]{5,}/i;
    evaluate(testo) {
        const parole = testo
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);
        for (const parola of parole) {
            if (parola.length < 5) {
                continue;
            }
            if (/\d/.test(parola)) {
                continue;
            }
            if (!/^[a-zàèéìòóù]+$/i.test(parola)) {
                continue;
            }
            if (ConsonantSequenceEvaluator.CONSONANT_SEQUENCE.test(parola)) {
                return new TextQualityContribution_1.TextQualityContribution("ConsonantSequenceEvaluator", 2, `La parola "${parola}" contiene una lunga sequenza di consonanti.`);
            }
        }
        return new TextQualityContribution_1.TextQualityContribution("ConsonantSequenceEvaluator", 0, "Nessuna sequenza anomala di consonanti rilevata.");
    }
}
exports.ConsonantSequenceEvaluator = ConsonantSequenceEvaluator;
//# sourceMappingURL=ConsonantSequenceEvaluator.js.map