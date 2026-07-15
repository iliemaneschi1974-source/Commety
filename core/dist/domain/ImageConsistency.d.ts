/**
 * ============================================================================
 * IMAGE CONSISTENCY
 * ----------------------------------------------------------------------------
 *
 * Rappresenta il livello di coerenza semantica tra
 * le immagini della segnalazione ed il contenuto
 * testuale fornito dall'utente.
 *
 * Questo oggetto è prodotto dal provider AI ma
 * appartiene al dominio di Commetty.
 *
 * Non rappresenta una decisione di moderazione.
 * ============================================================================
 */
export declare class ImageConsistency {
    /**
     * Similarità tra immagini e descrizione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    readonly descriptionSimilarity: number;
    /**
     * Similarità tra immagini e titolo.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    readonly titleSimilarity: number;
    /**
     * Similarità tra immagini e categoria.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    readonly categorySimilarity: number;
    /**
     * Livello complessivo di coerenza
     * calcolato dal provider AI.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    readonly confidence: number;
    constructor(
    /**
     * Similarità tra immagini e descrizione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    descriptionSimilarity: number, 
    /**
     * Similarità tra immagini e titolo.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    titleSimilarity: number, 
    /**
     * Similarità tra immagini e categoria.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    categorySimilarity: number, 
    /**
     * Livello complessivo di coerenza
     * calcolato dal provider AI.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    confidence: number);
}
//# sourceMappingURL=ImageConsistency.d.ts.map