import { TextQualityContribution } from "./TextQualityContribution";

/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * TextQualityEvaluator
 *
 * Contratto implementato da tutti gli evaluator
 * che contribuiscono alla valutazione della qualità
 * di un testo.
 *
 * Ogni evaluator osserva un singolo fenomeno
 * (es. rapporto vocali/consonanti, parole comuni,
 * sequenze di consonanti, ecc.).
 *
 * L'evaluator NON calcola il punteggio finale.
 * Produce solamente il proprio contributo.
 * ============================================================================
 */
export interface TextQualityEvaluator {
  /**
   * Valuta il testo fornito.
   *
   * @param testo Testo da analizzare.
   * @returns Contributo prodotto dall'evaluator.
   */
  evaluate(
    testo: string
  ): TextQualityContribution;
}