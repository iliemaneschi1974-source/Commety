import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";
/**
 * Rileva la presenza di contenuti
 * violenti nelle immagini.
 */
export declare class ViolenceRule extends AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di violenza rilevata.
     */
    protected valore(analisi: ImageAnalysis): number;
    /**
     * Restituisce la soglia
     * di rilevamento.
     */
    protected soglia(): number;
    /**
     * Restituisce il tipo
     * dell'evidenza prodotta.
     */
    protected tipo(): ModerationEvidenceType;
    /**
     * Restituisce la descrizione
     * dell'evidenza.
     */
    protected descrizione(): string;
}
//# sourceMappingURL=ViolenceRule.d.ts.map