import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";
/**
 * Rileva la presenza di armi
 * nelle immagini.
 */
export declare class WeaponRule extends AbstractSafetyImageRule {
    /**
     * Restituisce la probabilità
     * di armi rilevate.
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
//# sourceMappingURL=WeaponRule.d.ts.map