import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../ModerationEvidence";

/**
 * Definisce il contratto di un detector
 * specializzato nella moderazione delle immagini.
 *
 * Il detector non analizza direttamente le immagini,
 * ma interpreta il risultato prodotto
 * dall'Image Analysis Engine applicando
 * una o più ImageRule.
 */
export interface ImageDetector {

  /**
   * Analizza i risultati prodotti
   * dall'Image Analysis Engine e restituisce
   * le evidenze di moderazione rilevate.
   *
   * @param analyses Analisi delle immagini.
   * @returns Evidenze di moderazione.
   */
  analizza(
    analyses: readonly ImageAnalysis[]
  ): readonly ModerationEvidence[];

}