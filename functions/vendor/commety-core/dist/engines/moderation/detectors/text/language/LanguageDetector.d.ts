import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Language.
 */
export declare class LanguageDetector {
    private readonly rules;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=LanguageDetector.d.ts.map