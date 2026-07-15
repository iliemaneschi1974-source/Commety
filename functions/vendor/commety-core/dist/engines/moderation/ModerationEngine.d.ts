import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { ModerationContext } from "./ModerationContext";
import { ModerationResult } from "./ModerationResult";
/**
 * Definisce il contratto del Moderation Engine.
 *
 * Il Moderation Engine rappresenta il punto di ingresso
 * dell'intero processo di moderazione dei contenuti.
 */
export interface ModerationEngine {
    /**
     * Nuova API basata sul contesto.
     */
    modera(context: ModerationContext): ModerationResult;
    /**
     * API legacy.
     *
     * Verrà rimossa dopo la migrazione completa
     * al ModerationContext.
     */
    modera(contenuto: UserContent, immagine?: ImageAnalysis): ModerationResult;
}
//# sourceMappingURL=ModerationEngine.d.ts.map