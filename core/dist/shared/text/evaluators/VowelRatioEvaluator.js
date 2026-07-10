"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VowelRatioEvaluator = void 0;
const TextQualityContribution_1 = require("../TextQualityContribution");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * VowelRatioEvaluator
 *
 * Individua parole sospette prive di vocali.
 *
 * Osserva esclusivamente questo fenomeno e produce
 * un contributo al punteggio complessivo.
 * ============================================================================
 */
class VowelRatioEvaluator {
    evaluate(testo) {
        const parole = testo
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);
        for (const parola of parole) {
            // ignora parole corte
            if (parola.length < 5) {
                continue;
            }
            // ignora parole con numeri
            if (/\d/.test(parola)) {
                continue;
            }
            // ignora parole con caratteri diversi dalle lettere
            if (!/^[a-zàèéìòù]+$/i.test(parola)) {
                continue;
            }
            const vocali = parola.match(/[aeiouàèéìòù]/gi)?.length ??
                0;
            if (vocali === 0) {
                return new TextQualityContribution_1.TextQualityContribution("VowelRatioEvaluator", 3, `La parola "${parola}" non contiene vocali.`);
            }
        }
        return new TextQualityContribution_1.TextQualityContribution("VowelRatioEvaluator", 0, "Rapporto vocali/consonanti regolare.");
    }
}
exports.VowelRatioEvaluator = VowelRatioEvaluator;
//# sourceMappingURL=VowelRatioEvaluator.js.map