import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";

/**
 * Rileva la presenza di contenuti
 * pornografici in un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class PornographyRule implements ImageRule {
  /**
   * Soglia minima oltre la quale il contenuto
   * viene considerato pornografico.
   */
  private static readonly SOGLIA = 0.80;

  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {
    if (
      analisi.pornografia < PornographyRule.SOGLIA
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "IMMAGINE_PORNOGRAFICA",
        "Rilevato contenuto pornografico nell'immagine.",
        analisi.pornografia,
        "IMMAGINE"
      ),
    ];
  }
}