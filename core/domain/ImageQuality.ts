import { DetectionSignal } from "./DetectionSignal";

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
export class ImageQuality {

  constructor(

    /**
     * Presenza di watermark.
     */
    readonly watermark: DetectionSignal,

    /**
     * Presenza di screenshot.
     */
    readonly screenshot: DetectionSignal,

    /**
     * Presenza di meme.
     */
    readonly meme: DetectionSignal,

    /**
     * Probabilità che l'immagine sia AI-generated.
     */
    readonly aiGenerated: DetectionSignal

  ) {}

}