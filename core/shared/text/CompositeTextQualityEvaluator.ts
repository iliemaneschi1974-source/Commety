import { TextQualityContribution } from "./TextQualityContribution";
import { TextQualityEvaluator } from "./TextQualityEvaluator";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * CompositeTextQualityEvaluator
 *
 * Coordina tutti gli evaluator che contribuiscono
 * alla valutazione della qualità di un testo.
 *
 * Non calcola il punteggio finale.
 * Si limita a raccogliere tutti i contributi.
 * ============================================================================
 */
export class CompositeTextQualityEvaluator {
  constructor(
    private readonly evaluators: readonly TextQualityEvaluator[]
  ) {}

  evaluate(
    testo: string
  ): readonly TextQualityContribution[] {
    const contributions: TextQualityContribution[] = [];

    for (const evaluator of this.evaluators) {
      contributions.push(
        evaluator.evaluate(testo)
      );
    }

    return contributions;
  }
}