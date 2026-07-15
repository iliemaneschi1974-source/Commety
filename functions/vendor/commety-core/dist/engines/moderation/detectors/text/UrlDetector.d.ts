import { ModerationEvidence } from "../../ModerationEvidence";
import { TextDetector } from "./TextDetector";
/**
 * Detector specializzato nel rilevamento
 * di URL all'interno del testo.
 */
export declare class UrlDetector implements TextDetector {
    /**
     * Espressione regolare semplificata per il
     * rilevamento degli URL.
     *
     * Potrà essere raffinata negli sprint futuri.
     */
    private static readonly URL_REGEX;
    analizza(testo: string): readonly ModerationEvidence[];
}
//# sourceMappingURL=UrlDetector.d.ts.map