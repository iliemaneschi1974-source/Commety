import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";
/**
 * Rileva la presenza di contenuti
 * pornografici nelle immagini.
 */
export declare class PornographyRule extends AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di pornografia rilevata.
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
//# sourceMappingURL=PornographyRule.d.ts.map