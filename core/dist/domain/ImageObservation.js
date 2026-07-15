"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageObservation = void 0;
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
class ImageObservation {
    safety;
    privacy;
    quality;
    constructor(
    /**
     * Osservazioni relative alla sicurezza.
     */
    safety, 
    /**
     * Osservazioni relative alla privacy.
     */
    privacy, 
    /**
     * Osservazioni relative alla qualità.
     */
    quality) {
        this.safety = safety;
        this.privacy = privacy;
        this.quality = quality;
    }
}
exports.ImageObservation = ImageObservation;
//# sourceMappingURL=ImageObservation.js.map