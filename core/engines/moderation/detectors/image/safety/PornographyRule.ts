import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la presenza di contenuti
 * pornografici nelle immagini.
 */
export class PornographyRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * di pornografia rilevata.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.pornografia;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    return ImageModerationThresholds.PORNOGRAFIA;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "IMMAGINE_PORNOGRAFICA";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Contenuto pornografico rilevato.";
  }

}