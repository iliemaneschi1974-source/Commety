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
export declare class ContentConsistencyAnalysis {
    /**
     * Similarità tra descrizione utente
     * e descrizione dell'immagine.
     *
     * Valori ammessi:
     *
     * 0.0 = completamente diversi
     * 1.0 = semanticamente equivalenti
     */
    readonly descriptionSimilarity: number;
    /**
     * Similarità tra titolo utente
     * e contenuto dell'immagine.
     */
    readonly titleSimilarity: number;
    /**
     * Similarità tra categoria della segnalazione
     * e contenuto dell'immagine.
     */
    readonly categorySimilarity: number;
    /**
     * Livello di affidabilità della valutazione.
     */
    readonly confidence: number;
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
    descriptionSimilarity: number, 
    /**
     * Similarità tra titolo utente
     * e contenuto dell'immagine.
     */
    titleSimilarity: number, 
    /**
     * Similarità tra categoria della segnalazione
     * e contenuto dell'immagine.
     */
    categorySimilarity: number, 
    /**
     * Livello di affidabilità della valutazione.
     */
    confidence: number);
}
//# sourceMappingURL=ContentConsistencyAnalysis.d.ts.map