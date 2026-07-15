import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../domain/UserContent";
import { ContentConsistencyAnalysis } from "../../../../domain/ContentConsistencyAnalysis";
import { ModerationEvidence } from "../../ModerationEvidence";
/**
 * Coordina tutte le regole di coerenza
 * tra contenuto testuale e immagini.
 *
 * L'analyzer non contiene logica di business:
 * si limita ad orchestrare le singole regole.
 */
export declare class ImageTextConsistencyAnalyzer {
    private readonly rules;
    analizza(contenuto: UserContent, immagine: ImageAnalysis, consistency?: ContentConsistencyAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ImageTextConsistencyAnalyzer.d.ts.map