import { DetectionSignal } from "./DetectionSignal";
/**
 * ============================================================================
 * IMAGE PRIVACY
 * ----------------------------------------------------------------------------
 *
 * Value Object che rappresenta tutte le informazioni
 * riguardanti la privacy rilevate all'interno di
 * un'immagine.
 *
 * Contiene esclusivamente osservazioni AI
 * normalizzate nel dominio.
 *
 * Non rappresenta una decisione di moderazione.
 * ============================================================================
 */
export declare class ImagePrivacy {
    /**
     * Presenza di targhe leggibili.
     */
    readonly licensePlates: DetectionSignal;
    /**
     * Presenza di volti riconoscibili.
     */
    readonly faces: DetectionSignal;
    /**
     * Presenza di documenti leggibili.
     */
    readonly documents: DetectionSignal;
    constructor(
    /**
     * Presenza di targhe leggibili.
     */
    licensePlates: DetectionSignal, 
    /**
     * Presenza di volti riconoscibili.
     */
    faces: DetectionSignal, 
    /**
     * Presenza di documenti leggibili.
     */
    documents: DetectionSignal);
}
//# sourceMappingURL=ImagePrivacy.d.ts.map