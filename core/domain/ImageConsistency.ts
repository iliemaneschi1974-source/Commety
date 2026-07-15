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
export class ImageConsistency {

  constructor(

    /**
     * Similarità tra immagini e descrizione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    public readonly descriptionSimilarity: number,

    /**
     * Similarità tra immagini e titolo.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    public readonly titleSimilarity: number,

    /**
     * Similarità tra immagini e categoria.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    public readonly categorySimilarity: number,

    /**
     * Livello complessivo di coerenza
     * calcolato dal provider AI.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    public readonly confidence: number

  ) {}

}