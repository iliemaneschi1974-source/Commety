import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la presenza di armi
 * nelle immagini.
 */
export class WeaponRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * di armi rilevate.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.armi;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    return ImageModerationThresholds.ARMI;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "ARMI_RILEVATE";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Armi rilevate.";
  }

}