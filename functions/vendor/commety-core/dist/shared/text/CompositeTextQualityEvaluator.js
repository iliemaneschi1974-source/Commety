"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeTextQualityEvaluator = void 0;
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * CompositeTextQualityEvaluator
 *
 * Coordina tutti gli evaluator che contribuiscono
 * alla valutazione della qualità di un testo.
 *
 * Non calcola il punteggio finale.
 * Si limita a raccogliere tutti i contributi.
 * ============================================================================
 */
class CompositeTextQualityEvaluator {
    evaluators;
    constructor(evaluators) {
        this.evaluators = evaluators;
    }
    evaluate(testo) {
        const contributions = [];
        for (const evaluator of this.evaluators) {
            contributions.push(evaluator.evaluate(testo));
        }
        return contributions;
    }
}
exports.CompositeTextQualityEvaluator = CompositeTextQualityEvaluator;
//# sourceMappingURL=CompositeTextQualityEvaluator.js.map