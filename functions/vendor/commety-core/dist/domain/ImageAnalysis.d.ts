/**
 * Rappresenta il risultato dell'analisi di una
 * singola immagine effettuata da un qualsiasi
 * motore di Computer Vision o Intelligenza Artificiale.
 *
 * Questo oggetto appartiene al dominio ed è
 * completamente indipendente dal provider utilizzato
 * (OpenAI, Gemini, Azure Vision, AWS Rekognition, ecc.).
 */
export declare class ImageAnalysis {
    /**
     * Probabilità che l'immagine contenga
     * materiale pornografico.
     */
    readonly pornografia: number;
    /**
     * Probabilità che l'immagine contenga
     * nudità.
     */
    readonly nudita: number;
    /**
     * Probabilità che siano presenti minori
     * in situazioni che richiedono moderazione.
     */
    readonly childSafety: number;
    /**
     * Probabilità che l'immagine contenga
     * violenza.
     */
    readonly violenza: number;
    /**
     * Probabilità che siano presenti
     * sangue o scene particolarmente cruente.
     */
    readonly gore: number;
    /**
     * Probabilità che siano presenti
     * armi.
     */
    readonly armi: number;
    /**
     * Probabilità che siano presenti
     * maltrattamenti verso animali.
     */
    readonly animalCruelty: number;
    /**
     * Probabilità che l'immagine sia
     * stata generata artificialmente.
     */
    readonly aiGenerated: number;
    /**
     * Probabilità che l'immagine sia
     * uno screenshot.
     */
    readonly screenshot: number;
    /**
     * Probabilità che siano presenti
     * watermark.
     */
    readonly watermark: number;
    /**
     * Probabilità che l'immagine sia
     * un meme.
     */
    readonly meme: number;
    /**
     * Probabilità che siano presenti
     * uno o più volti riconoscibili.
     */
    readonly volti: number;
    /**
     * Probabilità che siano presenti
     * una o più targhe di veicoli.
     */
    readonly targhe: number;
    /**
     * Probabilità che siano presenti
     * documenti contenenti dati personali.
     */
    readonly documenti: number;
    /**
     * Descrizione testuale sintetica
     * dell'immagine prodotta dal provider.
     *
     * Sarà utile per le future analisi
     * di pertinenza rispetto alla segnalazione.
     */
    readonly descrizione?: string | undefined;
    constructor(
    /**
     * Probabilità che l'immagine contenga
     * materiale pornografico.
     */
    pornografia?: number, 
    /**
     * Probabilità che l'immagine contenga
     * nudità.
     */
    nudita?: number, 
    /**
     * Probabilità che siano presenti minori
     * in situazioni che richiedono moderazione.
     */
    childSafety?: number, 
    /**
     * Probabilità che l'immagine contenga
     * violenza.
     */
    violenza?: number, 
    /**
     * Probabilità che siano presenti
     * sangue o scene particolarmente cruente.
     */
    gore?: number, 
    /**
     * Probabilità che siano presenti
     * armi.
     */
    armi?: number, 
    /**
     * Probabilità che siano presenti
     * maltrattamenti verso animali.
     */
    animalCruelty?: number, 
    /**
     * Probabilità che l'immagine sia
     * stata generata artificialmente.
     */
    aiGenerated?: number, 
    /**
     * Probabilità che l'immagine sia
     * uno screenshot.
     */
    screenshot?: number, 
    /**
     * Probabilità che siano presenti
     * watermark.
     */
    watermark?: number, 
    /**
     * Probabilità che l'immagine sia
     * un meme.
     */
    meme?: number, 
    /**
     * Probabilità che siano presenti
     * uno o più volti riconoscibili.
     */
    volti?: number, 
    /**
     * Probabilità che siano presenti
     * una o più targhe di veicoli.
     */
    targhe?: number, 
    /**
     * Probabilità che siano presenti
     * documenti contenenti dati personali.
     */
    documenti?: number, 
    /**
     * Descrizione testuale sintetica
     * dell'immagine prodotta dal provider.
     *
     * Sarà utile per le future analisi
     * di pertinenza rispetto alla segnalazione.
     */
    descrizione?: string | undefined);
}
//# sourceMappingURL=ImageAnalysis.d.ts.map