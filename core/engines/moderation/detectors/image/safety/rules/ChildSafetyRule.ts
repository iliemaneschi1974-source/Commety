import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";

/**
 * Rileva la presenza di contenuti che
 * coinvolgono minori e richiedono
 * particolare attenzione.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class ChildSafetyRule implements ImageRule {
  /**
   * Soglia minima oltre la quale
   * il contenuto viene considerato
   * meritevole di moderazione.
   */
  private static readonly SOGLIA = 0.80;

  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {
    if (
      analisi.childSafety < ChildSafetyRule.SOGLIA
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "MINORI_RILEVATI",
        "Rilevata la possibile presenza di minori in un contenuto che richiede moderazione.",
        analisi.childSafety,
        "IMMAGINE"
      ),
    ];
  }
}