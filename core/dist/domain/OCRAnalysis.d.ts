/**
 * Rappresenta il risultato dell'analisi OCR
 * effettuata su una singola immagine.
 *
 * Questa classe appartiene al dominio ed è
 * completamente indipendente dal provider OCR
 * utilizzato (OpenAI, Azure OCR, Google Vision,
 * AWS Textract, ecc.).
 */
export declare class OCRAnalysis {
    /**
     * Testo estratto dall'immagine.
     */
    readonly testo: string;
    /**
     * Livello di confidenza dell'estrazione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    readonly confidenza: number;
    /**
     * Lingua rilevata.
     *
     * Esempi:
     * - it
     * - en
     * - fr
     */
    readonly lingua?: string | undefined;
    constructor(
    /**
     * Testo estratto dall'immagine.
     */
    testo: string, 
    /**
     * Livello di confidenza dell'estrazione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    confidenza: number, 
    /**
     * Lingua rilevata.
     *
     * Esempi:
     * - it
     * - en
     * - fr
     */
    lingua?: string | undefined);
}
//# sourceMappingURL=OCRAnalysis.d.ts.map