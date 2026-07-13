import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { UserContent } from "../../../../../domain/UserContent";

import { ModerationEvidence } from "../../../ModerationEvidence";
import { ImageTextConsistencyRule } from "./ImageTextConsistencyRule";

/**
 * Verifica la coerenza tra la descrizione
 * fornita dall'utente e quella ricavata
 * dall'analisi dell'immagine.
 *
 * Prima implementazione:
 * se manca il testo non produce evidenze.
 */
export class DescriptionConsistencyRule
  implements ImageTextConsistencyRule {

  analizza(
    contenuto: UserContent,
    immagine: ImageAnalysis
  ): readonly ModerationEvidence[] {

    if (!contenuto.hasTesto()) {
      return [];
    }

    if (!immagine.descrizione) {
      return [];
    }

    /**
     * La logica verrà introdotta
     * nello sprint successivo.
     */

    return [];

  }

}