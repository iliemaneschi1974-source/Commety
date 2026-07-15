import { ModerationEvidence } from "../../ModerationEvidence";
import { TextDetector } from "./TextDetector";
/**
 * Detector specializzato nel rilevamento
 * di numeri di telefono all'interno del testo.
 */
export declare class PhoneNumberDetector implements TextDetector {
    /**
     * Espressione regolare semplificata per il
     * rilevamento dei numeri di telefono.
     *
     * Potrà essere raffinata negli sprint futuri.
     */
    private static readonly PHONE_REGEX;
    analizza(testo: string): readonly ModerationEvidence[];
}
//# sourceMappingURL=PhoneNumberDetector.d.ts.map