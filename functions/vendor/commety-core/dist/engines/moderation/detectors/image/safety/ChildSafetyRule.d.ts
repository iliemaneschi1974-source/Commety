import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";
/**
 * Rileva la possibile presenza
 * di contenuti che coinvolgono minori
 * e richiedono moderazione.
 */
export declare class ChildSafetyRule extends AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * rilevata dall'Image Analysis Engine.
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
//# sourceMappingURL=ChildSafetyRule.d.ts.map