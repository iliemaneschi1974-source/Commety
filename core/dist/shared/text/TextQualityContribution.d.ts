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
export declare class TextQualityContribution {
    /**
     * Nome dell'evaluator che ha prodotto
     * il contributo.
     */
    readonly evaluator: string;
    /**
     * Punteggio assegnato.
     *
     * Valori positivi peggiorano la qualità.
     * Valori negativi migliorano la qualità.
     */
    readonly score: number;
    /**
     * Motivazione del contributo.
     */
    readonly reason: string;
    constructor(
    /**
     * Nome dell'evaluator che ha prodotto
     * il contributo.
     */
    evaluator: string, 
    /**
     * Punteggio assegnato.
     *
     * Valori positivi peggiorano la qualità.
     * Valori negativi migliorano la qualità.
     */
    score: number, 
    /**
     * Motivazione del contributo.
     */
    reason: string);
}
//# sourceMappingURL=TextQualityContribution.d.ts.map