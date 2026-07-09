import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
import { ImageModerationThresholds } from "../ImageModerationThresholds";

/**
 * Rileva la presenza di uno o più
 * volti riconoscibili nelle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export class FaceRule extends AbstractImageRule {

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    if (analisi.volti < ImageModerationThresholds.VOLTI) {
      return [];
    }

    return [
      this.creaEvidence(
        "VOLTO_RILEVATO",
        "Volto riconoscibile rilevato.",
        analisi.volti
      )
    ];

  }

}