import { UserContent } from "../../../../../../domain/UserContent";
import { DefaultTextQualityScorer } from "../../../../../../shared/text/DefaultTextQualityScorer";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";

/**
 * Rileva testi privi di significato.
 *
 * La regola non implementa alcun algoritmo
 * di analisi: delega completamente la
 * valutazione al Text Quality Engine.
 */
export class GibberishRule
  implements QualityRule
{
  private readonly scorer =
    new DefaultTextQualityScorer();

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const score =
      this.scorer.score(
        contenuto.testo!
      );

    if (!score.isPoor()) {
      return [];
    }

    return [
      new ModerationEvidence(
        "TESTO_NON_SIGNIFICATIVO",
        "Il testo sembra privo di significato.",
        0.95,
        "TESTO"
      ),
    ];
  }
}