/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * TextQualityContribution
 *
 * Rappresenta il contributo prodotto da un singolo
 * TextQualityEvaluator.
 *
 * Il DefaultTextQualityScorer raccoglierà tutti i
 * contributi e calcolerà il TextQualityScore finale.
 *
 * Questo oggetto NON rappresenta il risultato finale.
 * ============================================================================
 */
export class TextQualityContribution {
  constructor(
    /**
     * Nome dell'evaluator che ha prodotto
     * il contributo.
     */
    public readonly evaluator: string,

    /**
     * Punteggio assegnato.
     *
     * Valori positivi peggiorano la qualità.
     * Valori negativi migliorano la qualità.
     */
    public readonly score: number,

    /**
     * Motivazione del contributo.
     */
    public readonly reason: string
  ) {}
}