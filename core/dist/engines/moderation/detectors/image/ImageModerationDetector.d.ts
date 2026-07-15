import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../ModerationEvidence";
/**
 * ============================================================================
 * IMAGE MODERATION DETECTOR
 * ----------------------------------------------------------------------------
 *
 * Punto di ingresso dell'intera moderazione
 * delle immagini.
 *
 * Coordina tutte le famiglie di regole:
 *
 * - Safety
 * - Privacy
 * - Quality
 *
 * Non prende decisioni.
 * Non interpreta le evidenze.
 *
 * Si limita ad eseguire tutti i detector
 * e raccogliere le evidenze prodotte.
 * ============================================================================
 */
export declare class ImageModerationDetector {
    /**
     * Detector dedicato ai contenuti
     * pericolosi.
     */
    private readonly safetyDetector;
    /**
     * Regole di privacy.
     */
    private readonly privacyRules;
    /**
     * Regole di qualità.
     */
    private readonly qualityRules;
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ImageModerationDetector.d.ts.map