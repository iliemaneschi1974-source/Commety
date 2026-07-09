import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la presenza di contenuti
 * violenti nelle immagini.
 */
export class ViolenceRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * di violenza rilevata.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.violenza;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    return ImageModerationThresholds.VIOLENZA;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "IMMAGINE_VIOLENTA";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Contenuto violento rilevato.";
  }

}