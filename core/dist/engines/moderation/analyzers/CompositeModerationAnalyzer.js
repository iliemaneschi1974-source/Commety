"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeModerationAnalyzer = void 0;
const ImageSafetyDetector_1 = require("../detectors/image/safety/ImageSafetyDetector");
const LanguageDetector_1 = require("../detectors/text/language/LanguageDetector");
const PrivacyDetector_1 = require("../detectors/text/privacy/PrivacyDetector");
const QualityDetector_1 = require("../detectors/text/quality/QualityDetector");
const SpamDetector_1 = require("../detectors/text/spam/SpamDetector");
/**
 * Coordina tutti i detector del Moderation Engine
 * producendo un'unica collezione di evidenze.
 */
class CompositeModerationAnalyzer {
    spamDetector = new SpamDetector_1.SpamDetector();
    languageDetector = new LanguageDetector_1.LanguageDetector();
    privacyDetector = new PrivacyDetector_1.PrivacyDetector();
    qualityDetector = new QualityDetector_1.QualityDetector();
    imageSafetyDetector = new ImageSafetyDetector_1.ImageSafetyDetector();
    analizza(contenuto, immagine) {
        const evidenze = [];
        evidenze.push(...this.spamDetector.analizza(contenuto));
        evidenze.push(...this.languageDetector.analizza(contenuto));
        evidenze.push(...this.privacyDetector.analizza(contenuto));
        evidenze.push(...this.qualityDetector.analizza(contenuto));
        if (immagine) {
            evidenze.push(...this.imageSafetyDetector.analizza(immagine));
        }
        return evidenze;
    }
}
exports.CompositeModerationAnalyzer = CompositeModerationAnalyzer;
//# sourceMappingURL=CompositeModerationAnalyzer.js.map