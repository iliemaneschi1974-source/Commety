import { TextQualityScore } from "./TextQualityScore";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * TextQualityScorer
 *
 * Contratto implementato da tutti i motori
 * di valutazione della qualità di un testo.
 *
 * Il compito dello scorer è produrre il
 * TextQualityScore finale.
 *
 * Non conosce il Moderation Engine.
 * Non conosce il Reputation Engine.
 * Non conosce l'AI.
 * ============================================================================
 */
export interface TextQualityScorer {
  /**
   * Valuta la qualità del testo.
   *
   * @param testo Testo da analizzare.
   * @returns Punteggio finale della qualità.
   */
  score(
    testo: string
  ): TextQualityScore;
}