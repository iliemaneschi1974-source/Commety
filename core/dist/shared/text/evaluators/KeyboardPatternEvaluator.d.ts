import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";
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
export declare class KeyboardPatternEvaluator implements TextQualityEvaluator {
    /**
     * Sequenze tipiche della tastiera.
     *
     * L'elenco potrà essere ampliato senza
     * modificare l'algoritmo.
     */
    private static readonly PATTERNS;
    evaluate(testo: string): TextQualityContribution;
}
//# sourceMappingURL=KeyboardPatternEvaluator.d.ts.map