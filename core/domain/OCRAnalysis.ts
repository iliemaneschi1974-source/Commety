/**
 * Rappresenta il risultato dell'analisi OCR
 * effettuata su una singola immagine.
 *
 * Questa classe appartiene al dominio ed è
 * completamente indipendente dal provider OCR
 * utilizzato (OpenAI, Azure OCR, Google Vision,
 * AWS Textract, ecc.).
 */
export class OCRAnalysis {

  constructor(

    /**
     * Testo estratto dall'immagine.
     */
    public readonly testo: string,

    /**
     * Livello di confidenza dell'estrazione.
     *
     * Valore compreso tra 0.0 e 1.0.
     */
    public readonly confidenza: number,

    /**
     * Lingua rilevata.
     *
     * Esempi:
     * - it
     * - en
     * - fr
     */
    public readonly lingua?: string

  ) {}

}