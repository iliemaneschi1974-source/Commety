import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la presenza di possibili
 * maltrattamenti verso animali.
 */
export class AnimalCrueltyRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * di maltrattamento rilevata.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.animalCruelty;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    return ImageModerationThresholds.ANIMAL_CRUELTY;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "MALTRATTAMENTO_ANIMALI";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Possibile maltrattamento di animali rilevato.";
  }

}