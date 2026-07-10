import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";
/**
 * Rileva la presenza di possibili
 * maltrattamenti verso animali.
 */
export declare class AnimalCrueltyRule extends AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di maltrattamento rilevata.
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
//# sourceMappingURL=AnimalCrueltyRule.d.ts.map