"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModerationDetector = void 0;
const ImageSafetyDetector_1 = require("./safety/ImageSafetyDetector");
const FaceRule_1 = require("./privacy/FaceRule");
const LicensePlateRule_1 = require("./privacy/LicensePlateRule");
const DocumentRule_1 = require("./privacy/DocumentRule");
const AIImageRule_1 = require("./quality/AIImageRule");
const ScreenshotRule_1 = require("./quality/ScreenshotRule");
const WatermarkRule_1 = require("./quality/WatermarkRule");
const MemeRule_1 = require("./quality/MemeRule");
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
class ImageModerationDetector {
    /**
     * Detector dedicato ai contenuti
     * pericolosi.
     */
    safetyDetector = new ImageSafetyDetector_1.ImageSafetyDetector();
    /**
     * Regole di privacy.
     */
    privacyRules = [
        new FaceRule_1.FaceRule(),
        new LicensePlateRule_1.LicensePlateRule(),
        new DocumentRule_1.DocumentRule(),
    ];
    /**
     * Regole di qualità.
     */
    qualityRules = [
        new AIImageRule_1.AIImageRule(),
        new ScreenshotRule_1.ScreenshotRule(),
        new WatermarkRule_1.WatermarkRule(),
        new MemeRule_1.MemeRule(),
    ];
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        const evidenze = [];
        /**
         * Safety
         */
        evidenze.push(...this.safetyDetector.analizza(analisi));
        /**
         * Privacy
         */
        for (const rule of this.privacyRules) {
            evidenze.push(...rule.analizza(analisi));
        }
        /**
         * Quality
         */
        for (const rule of this.qualityRules) {
            evidenze.push(...rule.analizza(analisi));
        }
        return evidenze;
    }
}
exports.ImageModerationDetector = ImageModerationDetector;
//# sourceMappingURL=ImageModerationDetector.js.map