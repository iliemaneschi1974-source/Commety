import { DetectionSignal } from "./DetectionSignal";
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
export declare class ImageSafety {
    readonly violence: DetectionSignal;
    readonly gore: DetectionSignal;
    readonly nudity: DetectionSignal;
    readonly pornography: DetectionSignal;
    readonly animalCruelty: DetectionSignal;
    readonly weapons: DetectionSignal;
    constructor(violence: DetectionSignal, gore: DetectionSignal, nudity: DetectionSignal, pornography: DetectionSignal, animalCruelty: DetectionSignal, weapons: DetectionSignal);
}
//# sourceMappingURL=ImageSafety.d.ts.map