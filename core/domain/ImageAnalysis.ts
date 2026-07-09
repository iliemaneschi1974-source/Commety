/**
 * Rappresenta il risultato dell'analisi di una
 * singola immagine effettuata da un qualsiasi
 * motore di Computer Vision o Intelligenza Artificiale.
 *
 * Questo oggetto appartiene al dominio ed è
 * completamente indipendente dal provider utilizzato
 * (OpenAI, Gemini, Azure Vision, AWS Rekognition, ecc.).
 */
export class ImageAnalysis {
  constructor(
    /**
     * Probabilità che l'immagine contenga
     * materiale pornografico.
     */
    public readonly pornografia: number = 0,

    /**
     * Probabilità che l'immagine contenga
     * nudità.
     */
    public readonly nudita: number = 0,

    /**
     * Probabilità che siano presenti minori
     * in situazioni che richiedono moderazione.
     */
    public readonly childSafety: number = 0,

    /**
     * Probabilità che l'immagine contenga
     * violenza.
     */
    public readonly violenza: number = 0,

    /**
     * Probabilità che siano presenti
     * sangue o scene particolarmente cruente.
     */
    public readonly gore: number = 0,

    /**
     * Probabilità che siano presenti
     * armi.
     */
    public readonly armi: number = 0,

    /**
     * Probabilità che siano presenti
     * maltrattamenti verso animali.
     */
    public readonly animalCruelty: number = 0,

    /**
     * Probabilità che l'immagine sia
     * stata generata artificialmente.
     */
    public readonly aiGenerated: number = 0,

    /**
     * Probabilità che l'immagine sia
     * uno screenshot.
     */
    public readonly screenshot: number = 0,

    /**
     * Probabilità che siano presenti
     * watermark.
     */
    public readonly watermark: number = 0,

    /**
     * Probabilità che l'immagine sia
     * un meme.
     */
    public readonly meme: number = 0,

    /**
     * Probabilità che siano presenti
     * uno o più volti riconoscibili.
     */
    public readonly volti: number = 0,

    /**
     * Probabilità che siano presenti
     * una o più targhe di veicoli.
     */
    public readonly targhe: number = 0,

    /**
     * Probabilità che siano presenti
     * documenti contenenti dati personali.
     */
    public readonly documenti: number = 0,

    /**
     * Descrizione testuale sintetica
     * dell'immagine prodotta dal provider.
     *
     * Sarà utile per le future analisi
     * di pertinenza rispetto alla segnalazione.
     */
    public readonly descrizione?: string
  ) {}
}