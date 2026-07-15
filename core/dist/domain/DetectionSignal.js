"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetectionSignal = void 0;
/**
 * ============================================================================
 * DETECTION SIGNAL
 * ----------------------------------------------------------------------------
 *
 * Value Object che rappresenta il risultato della rilevazione di un singolo
 * segnale da parte di un provider AI.
 *
 * Il DetectionSignal NON rappresenta una decisione di moderazione.
 *
 * Descrive esclusivamente:
 *
 * - se il fenomeno è stato rilevato;
 * - con quale livello di confidenza.
 *
 * Sarà successivamente interpretato dai Detector del Moderation Engine,
 * che potranno trasformarlo (o meno) in una ModerationEvidence.
 *
 * Esempi:
 *
 * - targa rilevata
 * - volto rilevato
 * - nudità rilevata
 * - violenza rilevata
 * - watermark rilevato
 * - contenuto AI-generated
 *
 * ============================================================================
 */
class DetectionSignal {
    /**
     * Indica se il fenomeno è stato rilevato.
     */
    detected;
    /**
     * Livello di confidenza espresso
     * nell'intervallo [0,1].
     */
    confidence;
    constructor(detected, confidence) {
        if (confidence < 0 ||
            confidence > 1) {
            throw new Error("DetectionSignal confidence must be between 0 and 1.");
        }
        this.detected = detected;
        this.confidence = confidence;
    }
}
exports.DetectionSignal = DetectionSignal;
//# sourceMappingURL=DetectionSignal.js.map