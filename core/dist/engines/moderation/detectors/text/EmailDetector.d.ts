import { ModerationEvidence } from "../../ModerationEvidence";
import { TextDetector } from "./TextDetector";
/**
 * Detector specializzato nel rilevamento
 * di indirizzi email all'interno del testo.
 */
export declare class EmailDetector implements TextDetector {
    /**
     * Espressione regolare semplificata per il
     * rilevamento degli indirizzi email.
     *
     * Potrà essere raffinata negli sprint futuri.
     */
    private static readonly EMAIL_REGEX;
    analizza(testo: string): readonly ModerationEvidence[];
}
//# sourceMappingURL=EmailDetector.d.ts.map