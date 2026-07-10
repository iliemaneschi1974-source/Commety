import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * ConsonantSequenceEvaluator
 *
 * Individua parole contenenti lunghe sequenze
 * di consonanti consecutive.
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
export declare class ConsonantSequenceEvaluator implements TextQualityEvaluator {
    private static readonly CONSONANT_SEQUENCE;
    evaluate(testo: string): TextQualityContribution;
}
//# sourceMappingURL=ConsonantSequenceEvaluator.d.ts.map