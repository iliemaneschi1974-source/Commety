"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageConsistency = void 0;
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
class ImageConsistency {
    descriptionSimilarity;
    titleSimilarity;
    categorySimilarity;
    confidence;
    constructor(
    /**
     * Similarità tra immagini e descrizione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    descriptionSimilarity, 
    /**
     * Similarità tra immagini e titolo.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    titleSimilarity, 
    /**
     * Similarità tra immagini e categoria.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    categorySimilarity, 
    /**
     * Livello complessivo di coerenza
     * calcolato dal provider AI.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    confidence) {
        this.descriptionSimilarity = descriptionSimilarity;
        this.titleSimilarity = titleSimilarity;
        this.categorySimilarity = categorySimilarity;
        this.confidence = confidence;
    }
}
exports.ImageConsistency = ImageConsistency;
//# sourceMappingURL=ImageConsistency.js.map