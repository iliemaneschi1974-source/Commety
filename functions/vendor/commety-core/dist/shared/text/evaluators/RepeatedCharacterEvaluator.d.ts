import { TextQualityContribution } from "../TextQualityContribution";
import { TextQualityEvaluator } from "../TextQualityEvaluator";
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * RepeatedCharacterEvaluator
 *
 * Rileva parole composte dallo stesso carattere
 * ripetuto molte volte.
 *
 * Esempi:
 *
 * aaaaaaa
 * bbbbbbbb
 * zzzzzzzz
 * !!!!!!!
 * 11111111
 *
 * Osserva esclusivamente questo fenomeno.
 * ============================================================================
 */
export declare class RepeatedCharacterEvaluator implements TextQualityEvaluator {
    /**
     * Stesso carattere ripetuto
     * almeno 5 volte consecutivamente.
     */
    private static readonly PATTERN;
    evaluate(testo: string): TextQualityContribution;
}
//# sourceMappingURL=RepeatedCharacterEvaluator.d.ts.map