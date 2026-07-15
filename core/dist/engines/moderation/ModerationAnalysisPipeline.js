"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationAnalysisPipeline = void 0;
const ImageTextConsistencyAnalyzer_1 = require("./analyzers/image/ImageTextConsistencyAnalyzer");
const ImageModerationDetector_1 = require("./detectors/image/ImageModerationDetector");
const LanguageDetector_1 = require("./detectors/text/language/LanguageDetector");
const PrivacyDetector_1 = require("./detectors/text/privacy/PrivacyDetector");
const QualityDetector_1 = require("./detectors/text/quality/QualityDetector");
const SpamDetector_1 = require("./detectors/text/spam/SpamDetector");
/**
 * ============================================================================
 * MODERATION ANALYSIS PIPELINE
 * ----------------------------------------------------------------------------
 *
 * Coordina tutti gli analyzer e i detector del Moderation Engine,
 * producendo un'unica collezione di evidenze.
 *
 * La pipeline rappresenta il punto centrale di orchestrazione
 * dell'intero processo di analisi della moderazione.
 *
 * Non prende decisioni.
 * Non interpreta le evidenze.
 *
 * Si limita ad eseguire tutti i componenti di analisi e
 * raccoglierne i risultati.
 * ============================================================================
 */
class ModerationAnalysisPipeline {
    spamDetector = new SpamDetector_1.SpamDetector();
    languageDetector = new LanguageDetector_1.LanguageDetector();
    privacyDetector = new PrivacyDetector_1.PrivacyDetector();
    qualityDetector = new QualityDetector_1.QualityDetector();
    /**
     * Punto di ingresso della moderazione immagini.
     */
    imageModerationDetector = new ImageModerationDetector_1.ImageModerationDetector();
    /**
     * Analizzatore di coerenza
     * tra testo e immagini.
     */
    imageTextConsistencyAnalyzer = new ImageTextConsistencyAnalyzer_1.ImageTextConsistencyAnalyzer();
    analizza(contenuto, immagine, consistency) {
        const evidenze = [];
        evidenze.push(...this.spamDetector.analizza(contenuto));
        evidenze.push(...this.languageDetector.analizza(contenuto));
        evidenze.push(...this.privacyDetector.analizza(contenuto));
        evidenze.push(...this.qualityDetector.analizza(contenuto));
        if (immagine) {
            /**
             * Moderazione completa delle immagini.
             */
            evidenze.push(...this.imageModerationDetector.analizza(immagine));
            /**
             * Coerenza tra testo e immagini.
             */
            evidenze.push(...this.imageTextConsistencyAnalyzer.analizza(contenuto, immagine, consistency));
        }
        return evidenze;
    }
}
exports.ModerationAnalysisPipeline = ModerationAnalysisPipeline;
//# sourceMappingURL=ModerationAnalysisPipeline.js.map