import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../ModerationEvidence";

/**
 * Contratto implementato da tutte le regole
 * di moderazione delle immagini.
 *
 * Ogni regola osserva esclusivamente un
 * fenomeno specifico dell'immagine e produce
 * una o più evidenze di moderazione.
 */
export interface ImageRule {
  /**
   * Analizza il risultato dell'elaborazione
   * effettuata dal provider di Computer Vision.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[];
}