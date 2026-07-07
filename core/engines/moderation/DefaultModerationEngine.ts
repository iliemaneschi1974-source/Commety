import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { CompositeModerationAnalyzer } from "./analyzers/CompositeModerationAnalyzer";
import { ModerationDecision } from "./ModerationDecision";
import { ModerationEngine } from "./ModerationEngine";
import { ModerationPolicy } from "./ModerationPolicy";

/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy.
 */
export class DefaultModerationEngine
  implements ModerationEngine
{
  private readonly analyzer =
    new CompositeModerationAnalyzer();

  constructor(
    private readonly policy: ModerationPolicy
  ) {}

  modera(
    contenuto: UserContent,
    immagine?: ImageAnalysis
  ): ModerationDecision {
    const evidenze =
      this.analyzer.analizza(contenuto, immagine);

    return this.policy.valuta(evidenze);
  }
}