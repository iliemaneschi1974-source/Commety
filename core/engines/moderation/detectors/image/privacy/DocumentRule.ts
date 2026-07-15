import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
import { ImageModerationThresholds } from "../ImageModerationThresholds";

/**
 * Rileva la presenza di documenti
 * contenenti potenziali dati personali.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export class DocumentRule extends AbstractImageRule {

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    if (analisi.documenti < ImageModerationThresholds.DOCUMENTI) {
      return [];
    }

    return [
      this.creaEvidence(
        "DATI_PERSONALI_RILEVATI",
        "Documento contenente dati personali chiaramente leggibilirilevato.",
        analisi.documenti
      )
    ];

  }

}