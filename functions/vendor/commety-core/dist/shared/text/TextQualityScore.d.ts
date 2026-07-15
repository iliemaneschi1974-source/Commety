/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * TextQualityScore
 *
 * Value Object che rappresenta il livello di qualità
 * di un testo analizzato dal Core.
 *
 * Non appartiene alla Moderation.
 *
 * Potrà essere riutilizzato da:
 *
 * - Moderation Engine
 * - Reputation Engine
 * - AI Engine
 * - Search Engine
 * - Analytics
 * ============================================================================
 */
export declare class TextQualityScore {
    /**
     * Valore complessivo della qualità.
     *
     * Più è alto,
     * peggiore è il testo.
     */
    readonly value: number;
    /**
     * Motivazioni che hanno contribuito
     * al punteggio finale.
     */
    readonly reasons: readonly string[];
    constructor(
    /**
     * Valore complessivo della qualità.
     *
     * Più è alto,
     * peggiore è il testo.
     */
    value: number, 
    /**
     * Motivazioni che hanno contribuito
     * al punteggio finale.
     */
    reasons?: readonly string[]);
    /**
     * Il testo è di qualità insufficiente.
     */
    isPoor(): boolean;
    /**
     * Il testo è accettabile.
     */
    isAcceptable(): boolean;
}
//# sourceMappingURL=TextQualityScore.d.ts.map