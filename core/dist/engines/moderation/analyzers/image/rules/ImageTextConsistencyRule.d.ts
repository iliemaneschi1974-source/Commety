import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Contratto per una regola di coerenza
 * tra contenuto testuale e immagini.
 */
export interface ImageTextConsistencyRule {
    /**
     * Analizza il contenuto e restituisce
     * le eventuali evidenze prodotte.
     */
    analizza(contenuto: UserContent, immagine: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ImageTextConsistencyRule.d.ts.map