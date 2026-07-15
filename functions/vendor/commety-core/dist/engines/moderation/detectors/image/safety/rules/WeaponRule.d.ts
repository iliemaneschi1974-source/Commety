import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";
/**
 * Rileva la presenza di armi
 * all'interno di un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class WeaponRule implements ImageRule {
    /**
     * Soglia minima oltre la quale
     * la presenza di armi viene
     * considerata rilevante.
     */
    private static readonly SOGLIA;
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=WeaponRule.d.ts.map