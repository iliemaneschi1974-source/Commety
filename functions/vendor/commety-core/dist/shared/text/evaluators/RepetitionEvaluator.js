"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepetitionEvaluator = void 0;
const TextQualityContribution_1 = require("../TextQualityContribution");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RepetitionEvaluator
 *
 * Individua ripetizioni anomale di parole
 * o caratteri.
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
class RepetitionEvaluator {
    evaluate(testo) {
        const parole = testo
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .filter(Boolean);
        // stessa parola ripetuta almeno 3 volte consecutive
        let consecutive = 1;
        for (let i = 1; i < parole.length; i++) {
            if (parole[i] === parole[i - 1]) {
                consecutive++;
                if (consecutive >= 3) {
                    return new TextQualityContribution_1.TextQualityContribution("RepetitionEvaluator", 2, `La parola "${parole[i]}" è ripetuta troppe volte.`);
                }
            }
            else {
                consecutive = 1;
            }
        }
        // stesso carattere ripetuto almeno 6 volte
        if (/(.)\1{5,}/u.test(testo)) {
            return new TextQualityContribution_1.TextQualityContribution("RepetitionEvaluator", 2, "Sono presenti ripetizioni anomale di caratteri.");
        }
        return new TextQualityContribution_1.TextQualityContribution("RepetitionEvaluator", 0, "Nessuna ripetizione anomala rilevata.");
    }
}
exports.RepetitionEvaluator = RepetitionEvaluator;
//# sourceMappingURL=RepetitionEvaluator.js.map