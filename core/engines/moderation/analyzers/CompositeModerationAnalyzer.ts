import { ImageAnalysis } from "../../../domain/ImageAnalysis";
import { UserContent } from "../../../domain/UserContent";
import { ModerationEvidence } from "../ModerationEvidence";
import { ImageSafetyDetector } from "../detectors/image/safety/ImageSafetyDetector";
import { LanguageDetector } from "../detectors/text/language/LanguageDetector";
import { PrivacyDetector } from "../detectors/text/privacy/PrivacyDetector";
import { SpamDetector } from "../detectors/text/spam/SpamDetector";

/**
 * Coordina tutti i detector del Moderation Engine
 * producendo un'unica collezione di evidenze.
 */
export class CompositeModerationAnalyzer {
  private readonly spamDetector = new SpamDetector();

  private readonly languageDetector =
    new LanguageDetector();

  private readonly privacyDetector =
    new PrivacyDetector();

  private readonly imageSafetyDetector =
    new ImageSafetyDetector();

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

    if (immagine) {
      evidenze.push(
        ...this.imageSafetyDetector.analizza(
          immagine
        )
      );
    }

    return evidenze;
  }
}