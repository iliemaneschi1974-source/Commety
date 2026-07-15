import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";
/**
 * Rileva la presenza di contenuti
 * violenti in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class ViolenceRule implements ImageRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * violento.
     */
    private static readonly SOGLIA;
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ViolenceRule.d.ts.map