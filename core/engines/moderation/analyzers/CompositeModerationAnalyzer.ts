import { UserContent } from "@/core/domain/UserContent";

import { ModerationEvidence } from "../ModerationEvidence";
import { ImageDetector } from "@/core/engines/moderation/detectors/ImageDetector";
import { TextDetector } from "@/core/engines/moderation/detectors/text/TextDetector";
import { ModerationAnalyzer } from "./ModerationAnalyzer";

/**
 * Analyzer composito che coordina tutti i detector
 * di moderazione disponibili.
 *
 * È l'unico punto di ingresso del framework di analisi
 * della moderazione.
 */
export class CompositeModerationAnalyzer
  implements ModerationAnalyzer
{
  constructor(
    private readonly textDetectors: readonly TextDetector[],
    private readonly imageDetectors: readonly ImageDetector[]
  ) {}

  analizza(
    userContent: UserContent
  ): readonly ModerationEvidence[] {
    const evidenze: ModerationEvidence[] = [];

    this.analizzaTesto(userContent, evidenze);
    this.analizzaImmagini(userContent, evidenze);

    return evidenze;
  }

  private analizzaTesto(
    userContent: UserContent,
    evidenze: ModerationEvidence[]
  ): void {
    if (!userContent.hasTesto()) {
      return;
    }

    for (const detector of this.textDetectors) {
      evidenze.push(...detector.analizza(userContent.testo!));
    }
  }

  private analizzaImmagini(
    userContent: UserContent,
    evidenze: ModerationEvidence[]
  ): void {
    if (!userContent.hasImmagini()) {
      return;
    }

    for (const detector of this.imageDetectors) {
      evidenze.push(...detector.analizza(userContent.immagini));
    }
  }
}