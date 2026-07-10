import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";
/**
 * Rileva contenuti composti esclusivamente
 * da segni di punteggiatura.
 */
export declare class PunctuationOnlyRule implements QualityRule {
    /**
     * Verifica che il contenuto sia composto
     * esclusivamente da punteggiatura e spazi.
     */
    private static readonly PUNCTUATION_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=PunctuationOnlyRule.d.ts.map