import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Quality.
 */
export declare class QualityDetector {
    private readonly rules;
    /**
     * Analizza il contenuto utilizzando tutte
     * le regole della famiglia Quality.
     */
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=QualityDetector.d.ts.map