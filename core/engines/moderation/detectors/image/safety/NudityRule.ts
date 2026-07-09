import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la presenza di nudità
 * nelle immagini.
 */
export class NudityRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * di nudità rilevata.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.nudita;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    return ImageModerationThresholds.NUDITA;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "IMMAGINE_CON_NUDITA";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Nudità rilevata.";
  }

}