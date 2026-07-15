import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";
/**
 * Rileva la presenza di contenuti
 * particolarmente cruenti in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class GoreRule implements ImageRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * particolarmente cruento.
     */
    private static readonly SOGLIA;
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=GoreRule.d.ts.map