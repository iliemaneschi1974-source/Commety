import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { ModerationEngine } from "./ModerationEngine";
import { ModerationPolicy } from "./ModerationPolicy";
import { ModerationResult } from "./ModerationResult";
/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy;
 * - restituisce il risultato completo della moderazione.
 */
export declare class DefaultModerationEngine implements ModerationEngine {
    private readonly policy;
    private readonly analyzer;
    constructor(policy: ModerationPolicy);
    modera(contenuto: UserContent, immagine?: ImageAnalysis): ModerationResult;
}
//# sourceMappingURL=DefaultModerationEngine.d.ts.map