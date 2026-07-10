import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";
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
export declare class RepetitionEvaluator implements TextQualityEvaluator {
    evaluate(testo: string): TextQualityContribution;
}
//# sourceMappingURL=RepetitionEvaluator.d.ts.map