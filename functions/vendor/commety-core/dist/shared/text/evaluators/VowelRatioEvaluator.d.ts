import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";
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
export declare class VowelRatioEvaluator implements TextQualityEvaluator {
    evaluate(testo: string): TextQualityContribution;
}
//# sourceMappingURL=VowelRatioEvaluator.d.ts.map