import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { ModerationContext } from "./ModerationContext";
import { ModerationEngine } from "./ModerationEngine";
import { ModerationPolicy } from "./ModerationPolicy";
import { ModerationResult } from "./ModerationResult";
/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 *
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy;
 * - restituisce il risultato completo della moderazione.
 */
export declare class DefaultModerationEngine implements ModerationEngine {
    private readonly policy;
    private readonly analysisPipeline;
    constructor(policy: ModerationPolicy);
    /**
     * Nuova API.
     */
    modera(context: ModerationContext): ModerationResult;
    /**
     * API legacy.
     */
    modera(contenuto: UserContent, immagine?: ImageAnalysis): ModerationResult;
}
//# sourceMappingURL=DefaultModerationEngine.d.ts.map