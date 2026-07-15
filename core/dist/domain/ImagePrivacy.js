"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagePrivacy = void 0;
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
class ImagePrivacy {
    licensePlates;
    faces;
    documents;
    constructor(
    /**
     * Presenza di targhe leggibili.
     */
    licensePlates, 
    /**
     * Presenza di volti riconoscibili.
     */
    faces, 
    /**
     * Presenza di documenti leggibili.
     */
    documents) {
        this.licensePlates = licensePlates;
        this.faces = faces;
        this.documents = documents;
    }
}
exports.ImagePrivacy = ImagePrivacy;
//# sourceMappingURL=ImagePrivacy.js.map