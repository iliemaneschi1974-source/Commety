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
export declare class DetectionSignal {
    /**
     * Indica se il fenomeno è stato rilevato.
     */
    readonly detected: boolean;
    /**
     * Livello di confidenza espresso
     * nell'intervallo [0,1].
     */
    readonly confidence: number;
    constructor(detected: boolean, confidence: number);
}
//# sourceMappingURL=DetectionSignal.d.ts.map