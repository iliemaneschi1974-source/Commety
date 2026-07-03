/**
 * Risultato dell'analisi spaziale.
 */
export interface SpatialAnalysis {
  /**
   * Indica se la posizione è spazialmente plausibile.
   */
  readonly isValid: boolean;

  /**
   * Livello di confidenza compreso tra 0 e 1.
   */
  readonly confidence: number;

  /**
   * Motivazione dell'esito.
   */
  readonly reason: string;
}

/**
 * Informazioni minime necessarie
 * per effettuare la validazione spaziale.
 */
export interface SpatialCandidate {
  /**
   * Categoria della segnalazione.
   */
  readonly category: string;

  /**
   * Latitudine.
   */
  readonly latitude: number;

  /**
   * Longitudine.
   */
  readonly longitude: number;
}

/**
 * Contratto del validatore spaziale.
 */
export interface SpatialValidator {
  analyze(
    candidate: SpatialCandidate,

    /**
     * Posizione di riferimento.
     *
     * Ad esempio:
     * - posizione dell'utente
     * - posizione di un'altra segnalazione
     * - posizione di un evento
     */
    reference: {
      readonly latitude: number;
      readonly longitude: number;
    },
  ): SpatialAnalysis;
}