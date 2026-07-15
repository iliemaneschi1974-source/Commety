import { ImagePrivacy } from "./ImagePrivacy";
import { ImageQuality } from "./ImageQuality";
import { ImageSafety } from "./ImageSafety";
/**
 * ============================================================================
 * IMAGE OBSERVATION
 * ----------------------------------------------------------------------------
 *
 * Value Object che rappresenta l'insieme delle osservazioni prodotte
 * dal provider AI relativamente ad un'immagine.
 *
 * Non contiene alcuna logica di business.
 * Non rappresenta una decisione di moderazione.
 *
 * Le osservazioni verranno successivamente interpretate
 * dai Detector del Moderation Engine.
 * ============================================================================
 */
export declare class ImageObservation {
    /**
     * Osservazioni relative alla sicurezza.
     */
    readonly safety: ImageSafety;
    /**
     * Osservazioni relative alla privacy.
     */
    readonly privacy: ImagePrivacy;
    /**
     * Osservazioni relative alla qualità.
     */
    readonly quality: ImageQuality;
    constructor(
    /**
     * Osservazioni relative alla sicurezza.
     */
    safety: ImageSafety, 
    /**
     * Osservazioni relative alla privacy.
     */
    privacy: ImagePrivacy, 
    /**
     * Osservazioni relative alla qualità.
     */
    quality: ImageQuality);
}
//# sourceMappingURL=ImageObservation.d.ts.map