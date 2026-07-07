import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { AnimalCrueltyRule } from "./rules/AnimalCrueltyRule";
import { ChildSafetyRule } from "./rules/ChildSafetyRule";
import { GoreRule } from "./rules/GoreRule";
import { NudityRule } from "./rules/NudityRule";
import { PornographyRule } from "./rules/PornographyRule";
import { ViolenceRule } from "./rules/ViolenceRule";
import { WeaponRule } from "./rules/WeaponRule";

/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Image Safety.
 */
export class ImageSafetyDetector {
  private readonly rules = [
    new PornographyRule(),
    new NudityRule(),
    new ChildSafetyRule(),
    new ViolenceRule(),
    new GoreRule(),
    new WeaponRule(),
    new AnimalCrueltyRule(),
  ] as const;

  analizza(
    analisi: ImageAnalysis
  ): readonly ModerationEvidence[] {
    const evidenze: ModerationEvidence[] = [];

    for (const rule of this.rules) {
      evidenze.push(...rule.analizza(analisi));
    }

    return evidenze;
  }
}