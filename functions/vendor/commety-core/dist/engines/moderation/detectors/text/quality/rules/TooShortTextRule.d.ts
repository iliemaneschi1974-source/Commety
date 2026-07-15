import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";
/**
 * Rileva contenuti troppo brevi
 * e privi di reale significato.
 *
 * Ogni riga del contenuto viene analizzata
 * separatamente, così da gestire correttamente
 * titolo e descrizione.
 */
export declare class TooShortTextRule implements QualityRule {
    /**
     * Parole che, se utilizzate da sole,
     * non costituiscono una segnalazione.
     */
    private static readonly TESTI_NON_VALIDI;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=TooShortTextRule.d.ts.map