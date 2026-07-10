import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Spam.
 */
export declare class SpamDetector {
    private readonly rules;
    /**
     * Analizza il contenuto utilizzando tutte
     * le regole della famiglia Spam.
     */
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=SpamDetector.d.ts.map