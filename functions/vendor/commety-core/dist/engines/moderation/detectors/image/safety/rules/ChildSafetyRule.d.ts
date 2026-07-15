import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";
/**
 * Rileva la presenza di contenuti che
 * coinvolgono minori e richiedono
 * particolare attenzione.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class ChildSafetyRule implements ImageRule {
    /**
     * Soglia minima oltre la quale
     * il contenuto viene considerato
     * meritevole di moderazione.
     */
    private static readonly SOGLIA;
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ChildSafetyRule.d.ts.map