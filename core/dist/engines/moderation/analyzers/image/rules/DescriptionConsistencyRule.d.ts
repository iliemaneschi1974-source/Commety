import { ContentConsistencyAnalysis } from "../../../../../domain/ContentConsistencyAnalysis";
import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { ImageTextConsistencyRule } from "./ImageTextConsistencyRule";
/**
 * Verifica la coerenza semantica tra
 * il contenuto testuale della segnalazione
 * e il contenuto riconosciuto nelle immagini.
 */
export declare class DescriptionConsistencyRule implements ImageTextConsistencyRule {
    analizza(contenuto: UserContent, immagine: ImageAnalysis, consistency?: ContentConsistencyAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=DescriptionConsistencyRule.d.ts.map