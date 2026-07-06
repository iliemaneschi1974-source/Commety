import { ModerationEvidence } from "../../ModerationEvidence";

/**
 * Definisce il contratto di un detector
 * specializzato nell'analisi del testo.
 *
 * Un TextDetector rileva uno specifico fenomeno
 * (ad esempio spam, phishing o hate speech)
 * e produce una o più evidenze di moderazione.
 */
export interface TextDetector {
  /**
   * Analizza il testo e restituisce le evidenze rilevate.
   */
  analizza(
    testo: string
  ): readonly ModerationEvidence[];
}