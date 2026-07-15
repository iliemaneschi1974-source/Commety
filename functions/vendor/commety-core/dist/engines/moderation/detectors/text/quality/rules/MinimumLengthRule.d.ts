import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";
/**
 * Verifica che titolo e descrizione
 * abbiano una lunghezza minima.
 *
 * Questa regola osserva esclusivamente
 * la struttura della segnalazione e non
 * il suo contenuto semantico.
 */
export declare class MinimumLengthRule implements QualityRule {
    /**
     * Lunghezza minima del titolo.
     */
    private static readonly MIN_TITLE_LENGTH;
    /**
     * Lunghezza minima della descrizione.
     */
    private static readonly MIN_DESCRIPTION_LENGTH;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=MinimumLengthRule.d.ts.map