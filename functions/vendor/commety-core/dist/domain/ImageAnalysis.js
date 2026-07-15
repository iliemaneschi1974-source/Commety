"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAnalysis = void 0;
/**
 * Rappresenta il risultato dell'analisi di una
 * singola immagine effettuata da un qualsiasi
 * motore di Computer Vision o Intelligenza Artificiale.
 *
 * Questo oggetto appartiene al dominio ed è
 * completamente indipendente dal provider utilizzato
 * (OpenAI, Gemini, Azure Vision, AWS Rekognition, ecc.).
 */
class ImageAnalysis {
    pornografia;
    nudita;
    childSafety;
    violenza;
    gore;
    armi;
    animalCruelty;
    aiGenerated;
    screenshot;
    watermark;
    meme;
    volti;
    targhe;
    documenti;
    descrizione;
    constructor(
    /**
     * Probabilità che l'immagine contenga
     * materiale pornografico.
     */
    pornografia = 0, 
    /**
     * Probabilità che l'immagine contenga
     * nudità.
     */
    nudita = 0, 
    /**
     * Probabilità che siano presenti minori
     * in situazioni che richiedono moderazione.
     */
    childSafety = 0, 
    /**
     * Probabilità che l'immagine contenga
     * violenza.
     */
    violenza = 0, 
    /**
     * Probabilità che siano presenti
     * sangue o scene particolarmente cruente.
     */
    gore = 0, 
    /**
     * Probabilità che siano presenti
     * armi.
     */
    armi = 0, 
    /**
     * Probabilità che siano presenti
     * maltrattamenti verso animali.
     */
    animalCruelty = 0, 
    /**
     * Probabilità che l'immagine sia
     * stata generata artificialmente.
     */
    aiGenerated = 0, 
    /**
     * Probabilità che l'immagine sia
     * uno screenshot.
     */
    screenshot = 0, 
    /**
     * Probabilità che siano presenti
     * watermark.
     */
    watermark = 0, 
    /**
     * Probabilità che l'immagine sia
     * un meme.
     */
    meme = 0, 
    /**
     * Probabilità che siano presenti
     * uno o più volti riconoscibili.
     */
    volti = 0, 
    /**
     * Probabilità che siano presenti
     * una o più targhe di veicoli.
     */
    targhe = 0, 
    /**
     * Probabilità che siano presenti
     * documenti contenenti dati personali.
     */
    documenti = 0, 
    /**
     * Descrizione testuale sintetica
     * dell'immagine prodotta dal provider.
     *
     * Sarà utile per le future analisi
     * di pertinenza rispetto alla segnalazione.
     */
    descrizione) {
        this.pornografia = pornografia;
        this.nudita = nudita;
        this.childSafety = childSafety;
        this.violenza = violenza;
        this.gore = gore;
        this.armi = armi;
        this.animalCruelty = animalCruelty;
        this.aiGenerated = aiGenerated;
        this.screenshot = screenshot;
        this.watermark = watermark;
        this.meme = meme;
        this.volti = volti;
        this.targhe = targhe;
        this.documenti = documenti;
        this.descrizione = descrizione;
    }
}
exports.ImageAnalysis = ImageAnalysis;
//# sourceMappingURL=ImageAnalysis.js.map