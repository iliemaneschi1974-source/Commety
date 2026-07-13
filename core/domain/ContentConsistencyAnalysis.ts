/**
 * ============================================================================
 * CONTENT CONSISTENCY ANALYSIS
 * ----------------------------------------------------------------------------
 *
 * Value Object prodotto dalla pipeline AI.
 *
 * Rappresenta il grado di coerenza rilevato tra
 * il contenuto testuale fornito dall'utente e
 * il contenuto riconosciuto nelle immagini.
 *
 * Il Core non conosce come questi valori vengono
 * calcolati.
 * ============================================================================
 */
export class ContentConsistencyAnalysis {

  constructor(

    /**
     * Similarità tra descrizione utente
     * e descrizione dell'immagine.
     *
     * Valori ammessi:
     *
     * 0.0 = completamente diversi
     * 1.0 = semanticamente equivalenti
     */
    public readonly descriptionSimilarity: number,

    /**
     * Similarità tra titolo utente
     * e contenuto dell'immagine.
     */
    public readonly titleSimilarity: number,

    /**
     * Similarità tra categoria della segnalazione
     * e contenuto dell'immagine.
     */
    public readonly categorySimilarity: number,

    /**
     * Livello di affidabilità della valutazione.
     */
    public readonly confidence: number

  ) {}

}