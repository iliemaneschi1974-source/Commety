import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../domain/UserContent";
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
    analizza(contenuto: UserContent, immagine: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ImageTextConsistencyAnalyzer.d.ts.map