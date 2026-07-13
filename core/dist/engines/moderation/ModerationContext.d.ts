import { ContentConsistencyAnalysis } from "../../domain/ContentConsistencyAnalysis";
import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
/**
 * ============================================================================
 * MODERATION CONTEXT
 * ----------------------------------------------------------------------------
 *
 * Contesto completo della moderazione.
 *
 * Raccoglie tutte le informazioni necessarie
 * al Moderation Engine.
 *
 * Il numero delle informazioni potrà crescere
 * senza modificare la firma del motore.
 * ============================================================================
 */
export declare class ModerationContext {
    readonly userContent: UserContent;
    readonly imageAnalysis?: ImageAnalysis | undefined;
    readonly contentConsistency?: ContentConsistencyAnalysis | undefined;
    constructor(userContent: UserContent, imageAnalysis?: ImageAnalysis | undefined, contentConsistency?: ContentConsistencyAnalysis | undefined);
}
//# sourceMappingURL=ModerationContext.d.ts.map