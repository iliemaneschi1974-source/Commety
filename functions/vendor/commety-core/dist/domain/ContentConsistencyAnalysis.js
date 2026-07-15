"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentConsistencyAnalysis = void 0;
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
class ContentConsistencyAnalysis {
    descriptionSimilarity;
    titleSimilarity;
    categorySimilarity;
    confidence;
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
    descriptionSimilarity, 
    /**
     * Similarità tra titolo utente
     * e contenuto dell'immagine.
     */
    titleSimilarity, 
    /**
     * Similarità tra categoria della segnalazione
     * e contenuto dell'immagine.
     */
    categorySimilarity, 
    /**
     * Livello di affidabilità della valutazione.
     */
    confidence) {
        this.descriptionSimilarity = descriptionSimilarity;
        this.titleSimilarity = titleSimilarity;
        this.categorySimilarity = categorySimilarity;
        this.confidence = confidence;
    }
}
exports.ContentConsistencyAnalysis = ContentConsistencyAnalysis;
//# sourceMappingURL=ContentConsistencyAnalysis.js.map