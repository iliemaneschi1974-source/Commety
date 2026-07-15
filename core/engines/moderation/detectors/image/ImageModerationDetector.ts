import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../ModerationEvidence";

import { ImageSafetyDetector } from "./safety/ImageSafetyDetector";

import { FaceRule } from "./privacy/FaceRule";
import { LicensePlateRule } from "./privacy/LicensePlateRule";
import { DocumentRule } from "./privacy/DocumentRule";

import { AIImageRule } from "./quality/AIImageRule";
import { ScreenshotRule } from "./quality/ScreenshotRule";
import { WatermarkRule } from "./quality/WatermarkRule";
import { MemeRule } from "./quality/MemeRule";

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
export class ImageModerationDetector {

  /**
   * Detector dedicato ai contenuti
   * pericolosi.
   */
  private readonly safetyDetector =
    new ImageSafetyDetector();

  /**
   * Regole di privacy.
   */
  private readonly privacyRules = [
    new FaceRule(),
    new LicensePlateRule(),
    new DocumentRule(),
  ] as const;

  /**
   * Regole di qualità.
   */
  private readonly qualityRules = [
    new AIImageRule(),
    new ScreenshotRule(),
    new WatermarkRule(),
    new MemeRule(),
  ] as const;

  /**
   * Analizza una singola immagine.
   */
  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {

    const evidenze: ModerationEvidence[] = [];

    /**
     * Safety
     */
    evidenze.push(
      ...this.safetyDetector.analizza(
        analisi
      )
    );

    /**
     * Privacy
     */
    for (const rule of this.privacyRules) {
      evidenze.push(
        ...rule.analizza(analisi)
      );
    }

    /**
     * Quality
     */
    for (const rule of this.qualityRules) {
      evidenze.push(
        ...rule.analizza(analisi)
      );
    }

    return evidenze;

  }

}