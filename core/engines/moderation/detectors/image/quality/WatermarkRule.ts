import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
import { ImageModerationThresholds } from "../ImageModerationThresholds";

/**
 * Rileva la presenza di watermark
 * all'interno delle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export class WatermarkRule extends AbstractImageRule {

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    console.log(
      "[WatermarkRule]",
      {
        watermark: analisi.watermark,
        threshold: ImageModerationThresholds.WATERMARK,
      }
    );

    if (analisi.watermark < ImageModerationThresholds.WATERMARK) {
      return [];
    }

    console.log(
      "[WatermarkRule] Evidence generated"
    );

    return [
      this.creaEvidence(
        "WATERMARK",
        "Watermark chiaramente visibile rilevato.",
        analisi.watermark
      )
    ];

  }

}