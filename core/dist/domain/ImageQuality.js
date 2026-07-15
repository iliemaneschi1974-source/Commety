"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageQuality = void 0;
/**
 * ============================================================================
 * IMAGE QUALITY
 * ----------------------------------------------------------------------------
 *
 * Value Object che descrive gli aspetti qualitativi
 * dell'immagine rilevati dall'AI.
 *
 * Non rappresenta una decisione di moderazione.
 *
 * Contiene esclusivamente osservazioni normalizzate
 * del provider AI.
 * ============================================================================
 */
class ImageQuality {
    watermark;
    screenshot;
    meme;
    aiGenerated;
    constructor(
    /**
     * Presenza di watermark.
     */
    watermark, 
    /**
     * Presenza di screenshot.
     */
    screenshot, 
    /**
     * Presenza di meme.
     */
    meme, 
    /**
     * Probabilità che l'immagine sia AI-generated.
     */
    aiGenerated) {
        this.watermark = watermark;
        this.screenshot = screenshot;
        this.meme = meme;
        this.aiGenerated = aiGenerated;
    }
}
exports.ImageQuality = ImageQuality;
//# sourceMappingURL=ImageQuality.js.map