import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la presenza di sangue
 * o contenuti particolarmente cruenti.
 */
export class GoreRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * di contenuti cruenti rilevati.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.gore;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    return ImageModerationThresholds.GORE;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "IMMAGINE_CRUENTA";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Contenuto cruento rilevato.";
  }

}