import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../domain/UserContent";

import { ModerationEvidence } from "../../ModerationEvidence";

import { ImageTextConsistencyRule } from "./rules/ImageTextConsistencyRule";
import { DescriptionConsistencyRule } from "./rules/DescriptionConsistencyRule";

/**
 * Coordina tutte le regole di coerenza
 * tra contenuto testuale e immagini.
 *
 * L'analyzer non contiene logica di business:
 * si limita ad orchestrare le singole regole.
 */
export class ImageTextConsistencyAnalyzer {

  private readonly rules:
    readonly ImageTextConsistencyRule[] = [

      new DescriptionConsistencyRule(),

    ];

  analizza(
    contenuto: UserContent,
    immagine: ImageAnalysis
  ): readonly ModerationEvidence[] {

    const evidenze: ModerationEvidence[] = [];

    for (const rule of this.rules) {

      evidenze.push(
        ...rule.analizza(
          contenuto,
          immagine
        )
      );

    }

    return evidenze;

  }

}