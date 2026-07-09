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

export class TextQualityScore {
  constructor(
    /**
     * Valore complessivo della qualità.
     *
     * Più è alto,
     * peggiore è il testo.
     */
    public readonly value: number,

    /**
     * Motivazioni che hanno contribuito
     * al punteggio finale.
     */
    public readonly reasons: readonly string[] = []
  ) {}

  /**
   * Il testo è di qualità insufficiente.
   */
  isPoor(): boolean {
    return this.value >= 5;
  }

  /**
   * Il testo è accettabile.
   */
  isAcceptable(): boolean {
    return !this.isPoor();
  }
}