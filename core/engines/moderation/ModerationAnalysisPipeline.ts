import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";

import { ImageTextConsistencyAnalyzer } from "./analyzers/image/ImageTextConsistencyAnalyzer";
import { ModerationEvidence } from "./ModerationEvidence";
import { ImageSafetyDetector } from "./detectors/image/safety/ImageSafetyDetector";
import { LanguageDetector } from "./detectors/text/language/LanguageDetector";
import { PrivacyDetector } from "./detectors/text/privacy/PrivacyDetector";
import { QualityDetector } from "./detectors/text/quality/QualityDetector";
import { SpamDetector } from "./detectors/text/spam/SpamDetector";

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
export class ModerationAnalysisPipeline {

  private readonly spamDetector =
    new SpamDetector();

  private readonly languageDetector =
    new LanguageDetector();

  private readonly privacyDetector =
    new PrivacyDetector();

  private readonly qualityDetector =
    new QualityDetector();

  private readonly imageSafetyDetector =
    new ImageSafetyDetector();

  private readonly imageTextConsistencyAnalyzer =
    new ImageTextConsistencyAnalyzer();

  analizza(
    contenuto: UserContent,
    immagine?: ImageAnalysis
  ): readonly ModerationEvidence[] {

    const evidenze: ModerationEvidence[] = [];

    evidenze.push(
      ...this.spamDetector.analizza(contenuto)
    );

    evidenze.push(
      ...this.languageDetector.analizza(contenuto)
    );

    evidenze.push(
      ...this.privacyDetector.analizza(contenuto)
    );

    evidenze.push(
      ...this.qualityDetector.analizza(contenuto)
    );

    if (immagine) {

      evidenze.push(
        ...this.imageSafetyDetector.analizza(
          immagine
        )
      );

      evidenze.push(
        ...this.imageTextConsistencyAnalyzer.analizza(
          contenuto,
          immagine
        )
      );

    }

    return evidenze;

  }

}