import { ContentConsistencyAnalysis } from "../../../../../domain/ContentConsistencyAnalysis";
import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../../domain/UserContent";

import {
  ModerationEvidence,
} from "../../../ModerationEvidence";

import { ImageModerationThresholds } from "../../../detectors/image/ImageModerationThresholds";
import { ImageTextConsistencyRule } from "./ImageTextConsistencyRule";

/**
 * Verifica la coerenza semantica tra
 * il contenuto testuale della segnalazione
 * e il contenuto riconosciuto nelle immagini.
 */
export class DescriptionConsistencyRule
  implements ImageTextConsistencyRule {

  analizza(
    contenuto: UserContent,
    immagine: ImageAnalysis,
    consistency?: ContentConsistencyAnalysis
  ): readonly ModerationEvidence[] {

    if (!contenuto.hasTesto()) {
      return [];
    }

    if (!immagine.descrizione) {
      return [];
    }

    if (!consistency) {
      return [];
    }

    const soglia =
      ImageModerationThresholds.IMAGE_CONSISTENCY;

    if (
      consistency.descriptionSimilarity >= soglia &&
      consistency.titleSimilarity >= soglia &&
      consistency.categorySimilarity >= soglia
    ) {
      return [];
    }

    return [

      new ModerationEvidence(

        "IMMAGINE_NON_COERENTE",

        "L'immagine non risulta coerente con il contenuto della segnalazione.",

        consistency.confidence,

        "AI"

      )

    ];

  }

}