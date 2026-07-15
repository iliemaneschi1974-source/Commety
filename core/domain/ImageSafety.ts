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
export class ImageSafety {

  constructor(

    readonly violence: DetectionSignal,

    readonly gore: DetectionSignal,

    readonly nudity: DetectionSignal,

    readonly pornography: DetectionSignal,

    readonly animalCruelty: DetectionSignal,

    readonly weapons: DetectionSignal

  ) {}

}