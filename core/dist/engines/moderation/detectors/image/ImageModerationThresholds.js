"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModerationThresholds = void 0;
/**
 * Definisce le soglie utilizzate dalle ImageRule
 * per interpretare i risultati prodotti
 * dall'Image Analysis Engine.
 *
 * Tutti i valori rappresentano una probabilità
 * compresa tra 0.0 e 1.0.
 *
 * Centralizzare le soglie evita la presenza
 * di numeri magici all'interno delle regole
 * e rende il comportamento del motore uniforme.
 */
class ImageModerationThresholds {
    /**
     * Probabilità minima per considerare
     * un'immagine come screenshot.
     */
    static SCREENSHOT = 0.80;
    /**
     * Probabilità minima per considerare
     * presente un watermark.
     */
    static WATERMARK = 0.80;
    /**
     * Probabilità minima per classificare
     * un'immagine come meme.
     */
    static MEME = 0.80;
    /**
     * Probabilità minima per classificare
     * un'immagine come generata da IA.
     */
    static AI_GENERATED = 0.80;
    /**
     * Probabilità minima per classificare
     * contenuti pornografici.
     */
    static PORNOGRAFIA = 0.90;
    /**
     * Probabilità minima per classificare
     * contenuti con nudità.
     */
    static NUDITA = 0.85;
    /**
     * Probabilità minima per classificare
     * contenuti violenti.
     */
    static VIOLENZA = 0.85;
    /**
     * Probabilità minima per classificare
     * presenza di sangue.
     */
    static GORE = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di armi.
     */
    static ARMI = 0.85;
    /**
     * Probabilità minima per classificare
     * maltrattamenti verso animali.
     */
    static ANIMAL_CRUELTY = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di uno o più volti.
     */
    static VOLTI = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di una o più targhe.
     */
    static TARGHE = 0.85;
    /**
     * Probabilità minima per classificare
     * la presenza di documenti.
     */
    static DOCUMENTI = 0.85;
    constructor() {
        // Classe di utilità.
    }
}
exports.ImageModerationThresholds = ImageModerationThresholds;
//# sourceMappingURL=ImageModerationThresholds.js.map