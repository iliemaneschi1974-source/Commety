import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
/**
 * Rileva immagini probabilmente
 * generate tramite Intelligenza Artificiale.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export declare class AIImageRule extends AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=AIImageRule.d.ts.map