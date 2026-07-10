"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OCRAnalysis = void 0;
/**
 * Rappresenta il risultato dell'analisi OCR
 * effettuata su una singola immagine.
 *
 * Questa classe appartiene al dominio ed è
 * completamente indipendente dal provider OCR
 * utilizzato (OpenAI, Azure OCR, Google Vision,
 * AWS Textract, ecc.).
 */
class OCRAnalysis {
    testo;
    confidenza;
    lingua;
    constructor(
    /**
     * Testo estratto dall'immagine.
     */
    testo, 
    /**
     * Livello di confidenza dell'estrazione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    confidenza, 
    /**
     * Lingua rilevata.
     *
     * Esempi:
     * - it
     * - en
     * - fr
     */
    lingua) {
        this.testo = testo;
        this.confidenza = confidenza;
        this.lingua = lingua;
    }
}
exports.OCRAnalysis = OCRAnalysis;
//# sourceMappingURL=OCRAnalysis.js.map