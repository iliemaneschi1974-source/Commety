import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { BestemmieRule } from "./rules/BestemmieRule";
import { ParolacceRule } from "./rules/ParolacceRule";

/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Language.
 */
export class LanguageDetector {
  private readonly rules = [
    new ParolacceRule(),
    new BestemmieRule(),
  ] as const;

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    const evidenze: ModerationEvidence[] = [];

    for (const rule of this.rules) {
      evidenze.push(...rule.analizza(contenuto));
    }

    return evidenze;
  }
}