import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";

/**
 * Rileva la presenza di contenuti
 * violenti in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class ViolenceRule implements ImageRule {
  /**
   * Soglia minima oltre la quale
   * il contenuto viene considerato
   * violento.
   */
  private static readonly SOGLIA = 0.80;

  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {
    if (
      analisi.violenza < ViolenceRule.SOGLIA
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "IMMAGINE_VIOLENTA",
        "Rilevato contenuto violento nell'immagine.",
        analisi.violenza,
        "IMMAGINE"
      ),
    ];
  }
}