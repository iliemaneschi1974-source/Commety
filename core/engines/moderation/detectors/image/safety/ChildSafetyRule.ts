import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidenceType } from "../../../ModerationEvidence";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { AbstractSafetyImageRule } from "./AbstractSafetyImageRule";

/**
 * Rileva la possibile presenza
 * di contenuti che coinvolgono minori
 * e richiedono moderazione.
 */
export class ChildSafetyRule extends AbstractSafetyImageRule {

  /**
   * Restituisce la probabilità
   * rilevata dall'Image Analysis Engine.
   */
  protected valore(
    analisi: ImageAnalysis
  ): number {
    return analisi.childSafety;
  }

  /**
   * Restituisce la soglia
   * di rilevamento.
   */
  protected soglia(): number {
    // Al momento riutilizziamo la soglia della pornografia.
    // Se in futuro servirà una soglia dedicata, sarà sufficiente
    // aggiungerla a ImageModerationThresholds senza modificare
    // questa Rule.
    return ImageModerationThresholds.PORNOGRAFIA;
  }

  /**
   * Restituisce il tipo
   * dell'evidenza prodotta.
   */
  protected tipo(): ModerationEvidenceType {
    return "MINORI_RILEVATI";
  }

  /**
   * Restituisce la descrizione
   * dell'evidenza.
   */
  protected descrizione(): string {
    return "Possibile coinvolgimento di minori rilevato.";
  }

}