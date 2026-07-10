import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RoadVocabularyEvaluator
 *
 * Riconosce termini tipici della viabilità e
 * delle segnalazioni stradali.
 *
 * La presenza di questo vocabolario aumenta
 * l'affidabilità del testo e riduce il punteggio
 * complessivo del Text Quality Engine.
 * ============================================================================
 */
export declare class RoadVocabularyEvaluator implements TextQualityEvaluator {
    /**
     * Vocabolario iniziale della viabilità.
     *
     * Potrà essere ampliato nel tempo senza
     * modificare l'algoritmo.
     */
    private static readonly KEYWORDS;
    evaluate(testo: string): TextQualityContribution;
}
//# sourceMappingURL=RoadVocabularyEvaluator.d.ts.map