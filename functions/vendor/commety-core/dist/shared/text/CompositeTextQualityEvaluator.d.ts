import { TextQualityContribution } from "./TextQualityContribution";
import { TextQualityEvaluator } from "./TextQualityEvaluator";
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
export declare class CompositeTextQualityEvaluator {
    private readonly evaluators;
    constructor(evaluators: readonly TextQualityEvaluator[]);
    evaluate(testo: string): readonly TextQualityContribution[];
}
//# sourceMappingURL=CompositeTextQualityEvaluator.d.ts.map