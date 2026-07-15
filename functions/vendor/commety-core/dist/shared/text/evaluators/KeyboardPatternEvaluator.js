"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardPatternEvaluator = void 0;
const TextQualityContribution_1 = require("../TextQualityContribution");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * KeyboardPatternEvaluator
 *
 * Rileva sequenze tipiche della tastiera utilizzate
 * frequentemente come testo casuale durante test,
 * spam o contenuti privi di significato.
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
class KeyboardPatternEvaluator {
    /**
     * Sequenze tipiche della tastiera.
     *
     * L'elenco potrà essere ampliato senza
     * modificare l'algoritmo.
     */
    static PATTERNS = [
        "asdf",
        "qwert",
        "zxcv",
        "poiuy",
        "lkjh",
        "mnbv",
        "hjkl",
        "wert",
        "xcvb",
    ];
    evaluate(testo) {
        const parole = testo
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);
        for (const parola of parole) {
            const trovato = KeyboardPatternEvaluator.PATTERNS.some((pattern) => parola.includes(pattern));
            if (trovato) {
                return new TextQualityContribution_1.TextQualityContribution("KeyboardPatternEvaluator", 5, `La parola "${parola}" contiene una sequenza tipica della tastiera.`);
            }
        }
        return new TextQualityContribution_1.TextQualityContribution("KeyboardPatternEvaluator", 0, "Nessuna sequenza tipica della tastiera rilevata.");
    }
}
exports.KeyboardPatternEvaluator = KeyboardPatternEvaluator;
//# sourceMappingURL=KeyboardPatternEvaluator.js.map