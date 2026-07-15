import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Image Safety.
 */
export declare class ImageSafetyDetector {
    private readonly rules;
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ImageSafetyDetector.d.ts.map