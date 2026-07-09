import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
import { ImageModerationThresholds } from "../ImageModerationThresholds";

/**
 * Rileva immagini probabilmente
 * generate tramite Intelligenza Artificiale.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export class AIImageRule extends AbstractImageRule {

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    if (analisi.aiGenerated < ImageModerationThresholds.AI_GENERATED) {
      return [];
    }

    return [
      this.creaEvidence(
        "IMMAGINE_AI",
        "Immagine generata tramite Intelligenza Artificiale.",
        analisi.aiGenerated
      )
    ];

  }

}