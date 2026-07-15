import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
/**
 * Rileva la presenza di screenshot
 * all'interno delle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export declare class ScreenshotRule extends AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ScreenshotRule.d.ts.map