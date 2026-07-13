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
export class ModerationContext {

  constructor(

    public readonly userContent: UserContent,

    public readonly imageAnalysis?: ImageAnalysis,

    public readonly contentConsistency?:
      ContentConsistencyAnalysis,

  ) {}

}