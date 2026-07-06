import { ModerationEvidence } from "../ModerationEvidence";

/**
 * Definisce il contratto di un detector
 * specializzato nell'analisi delle immagini.
 *
 * Un ImageDetector rileva uno specifico fenomeno
 * (ad esempio watermark, dati personali o contenuti AI)
 * e produce una o più evidenze di moderazione.
 */
export interface ImageDetector {
  /**
   * Analizza una o più immagini e restituisce
   * le evidenze rilevate.
   */
  analizza(
    immagini: readonly string[]
  ): readonly ModerationEvidence[];
}