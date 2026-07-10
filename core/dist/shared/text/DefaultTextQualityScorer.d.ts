import { TextQualityScore } from "./TextQualityScore";
import { TextQualityScorer } from "./TextQualityScorer";
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * DefaultTextQualityScorer
 * ============================================================================
 */
export declare class DefaultTextQualityScorer implements TextQualityScorer {
    private readonly evaluator;
    score(testo: string): TextQualityScore;
}
//# sourceMappingURL=DefaultTextQualityScorer.d.ts.map