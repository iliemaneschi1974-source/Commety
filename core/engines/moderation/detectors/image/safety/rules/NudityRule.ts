import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";

/**
 * Rileva la presenza di nudità
 * all'interno di un'immagine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class NudityRule implements ImageRule {
  /**
   * Soglia minima oltre la quale
   * la nudità viene considerata rilevante.
   */
  private static readonly SOGLIA = 0.80;

  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {
    if (
      analisi.nudita < NudityRule.SOGLIA
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "IMMAGINE_CON_NUDITA",
        "Rilevata nudità nell'immagine.",
        analisi.nudita,
        "IMMAGINE"
      ),
    ];
  }
}