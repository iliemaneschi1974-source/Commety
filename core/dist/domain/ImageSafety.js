"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSafety = void 0;
/**
 * ============================================================================
 * IMAGE SAFETY
 * ----------------------------------------------------------------------------
 *
 * Value Object che descrive tutti i fenomeni
 * relativi alla sicurezza rilevati all'interno
 * di un'immagine.
 *
 * Non rappresenta una decisione.
 *
 * Contiene esclusivamente osservazioni AI
 * normalizzate nel dominio.
 * ============================================================================
 */
class ImageSafety {
    violence;
    gore;
    nudity;
    pornography;
    animalCruelty;
    weapons;
    constructor(violence, gore, nudity, pornography, animalCruelty, weapons) {
        this.violence = violence;
        this.gore = gore;
        this.nudity = nudity;
        this.pornography = pornography;
        this.animalCruelty = animalCruelty;
        this.weapons = weapons;
    }
}
exports.ImageSafety = ImageSafety;
//# sourceMappingURL=ImageSafety.js.map