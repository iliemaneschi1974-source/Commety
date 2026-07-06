import { ImageAnalysis } from "../../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { ImageRule } from "../../ImageRule";

/**
 * Rileva la presenza di possibili
 * maltrattamenti nei confronti degli animali.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export class AnimalCrueltyRule implements ImageRule {
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
      analisi.animalCruelty < AnimalCrueltyRule.SOGLIA
    ) {
      return [];
    }

    return [
      new ModerationEvidence(
        "MALTRATTAMENTO_ANIMALI",
        "Rilevato possibile maltrattamento di animali nell'immagine.",
        analisi.animalCruelty,
        "IMMAGINE"
      ),
    ];
  }
}