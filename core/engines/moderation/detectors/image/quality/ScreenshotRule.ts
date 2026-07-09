import { ModerationEvidence } from "../../../ModerationEvidence";
import {
  ModerationEvidenceSource,
  ModerationEvidenceType,
} from "../../../ModerationEvidence";
import { AbstractImageRule } from "../AbstractImageRule";
import { ImageModerationThresholds } from "../ImageModerationThresholds";
import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";

/**
 * Rileva la presenza di screenshot
 * all'interno delle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
export class ScreenshotRule extends AbstractImageRule {

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    if (analisi.screenshot < ImageModerationThresholds.SCREENSHOT) {
      return [];
    }

    return [
      new ModerationEvidence(
        "SCREENSHOT" as ModerationEvidenceType,
        "Screenshot rilevato.",
        analisi.screenshot,
        "IMMAGINE" as ModerationEvidenceSource
      ),
    ];

  }

}