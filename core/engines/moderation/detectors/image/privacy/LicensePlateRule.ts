import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
import { ImageModerationThresholds } from "../ImageModerationThresholds";

/**
 * Rileva la presenza di una o più
 * targhe di veicoli nelle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export class LicensePlateRule extends AbstractImageRule {

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    if (analisi.targhe < ImageModerationThresholds.TARGHE) {
      return [];
    }

    return [
      this.creaEvidence(
        "TARGA_RILEVATA",
        "Targa di veicolo rilevata.",
        analisi.targhe
      )
    ];

  }

}