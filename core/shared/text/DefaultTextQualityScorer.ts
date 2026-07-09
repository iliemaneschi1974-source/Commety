import { CompositeTextQualityEvaluator } from "./CompositeTextQualityEvaluator";
import { TextQualityContribution } from "./TextQualityContribution";
import { TextQualityScore } from "./TextQualityScore";
import { TextQualityScorer } from "./TextQualityScorer";

import { ConsonantSequenceEvaluator } from "./evaluators/ConsonantSequenceEvaluator";
import { KeyboardPatternEvaluator } from "./evaluators/KeyboardPatternEvaluator";
import { RepeatedCharacterEvaluator } from "./evaluators/RepeatedCharacterEvaluator";
import { RepetitionEvaluator } from "./evaluators/RepetitionEvaluator";
import { RoadVocabularyEvaluator } from "./evaluators/RoadVocabularyEvaluator";
import { VowelRatioEvaluator } from "./evaluators/VowelRatioEvaluator";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * DefaultTextQualityScorer
 * ============================================================================
 */
export class DefaultTextQualityScorer
  implements TextQualityScorer
{
  private readonly evaluator =
    new CompositeTextQualityEvaluator([
      new VowelRatioEvaluator(),
      new ConsonantSequenceEvaluator(),
      new RepetitionEvaluator(),
      new RepeatedCharacterEvaluator(),
      new RoadVocabularyEvaluator(),
      new KeyboardPatternEvaluator(),
    ]);

  score(
    testo: string
  ): TextQualityScore {
    const contributions =
      this.evaluator.evaluate(testo);

    const value = contributions.reduce(
      (
        total: number,
        contribution: TextQualityContribution
      ) => total + contribution.score,
      0
    );

    return new TextQualityScore(
      value,
      contributions.map(
        (contribution) =>
          contribution.reason
      )
    );
  }
}