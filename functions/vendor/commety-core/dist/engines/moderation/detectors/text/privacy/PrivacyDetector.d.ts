import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Privacy.
 */
export declare class PrivacyDetector {
    private readonly rules;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=PrivacyDetector.d.ts.map