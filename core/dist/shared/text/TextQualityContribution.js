"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextQualityContribution = void 0;
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * TextQualityContribution
 *
 * Rappresenta il contributo prodotto da un singolo
 * TextQualityEvaluator.
 *
 * Il DefaultTextQualityScorer raccoglierà tutti i
 * contributi e calcolerà il TextQualityScore finale.
 *
 * Questo oggetto NON rappresenta il risultato finale.
 * ============================================================================
 */
class TextQualityContribution {
    evaluator;
    score;
    reason;
    constructor(
    /**
     * Nome dell'evaluator che ha prodotto
     * il contributo.
     */
    evaluator, 
    /**
     * Punteggio assegnato.
     *
     * Valori positivi peggiorano la qualità.
     * Valori negativi migliorano la qualità.
     */
    score, 
    /**
     * Motivazione del contributo.
     */
    reason) {
        this.evaluator = evaluator;
        this.score = score;
        this.reason = reason;
    }
}
exports.TextQualityContribution = TextQualityContribution;
//# sourceMappingURL=TextQualityContribution.js.map