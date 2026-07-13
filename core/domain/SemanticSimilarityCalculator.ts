/**
 * ============================================================================
 * SEMANTIC SIMILARITY CALCULATOR
 * ----------------------------------------------------------------------------
 *
 * Domain Service responsabile del calcolo della similarità
 * semantica tra due testi.
 *
 * Il Core non conosce il provider utilizzato
 * (OpenAI, Gemini, modelli locali, ecc.).
 *
 * Conosce esclusivamente il risultato finale.
 * ============================================================================
 */
export interface SemanticSimilarityCalculator {

  /**
   * Calcola il grado di similarità semantica
   * tra due testi.
   *
   * Valori ammessi:
   *
   * 0.0 = completamente diversi
   * 1.0 = semanticamente equivalenti
   */
  calculate(
    firstText: string,
    secondText: string
  ): number;

}