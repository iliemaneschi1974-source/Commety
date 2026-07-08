import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { CompositeModerationAnalyzer } from "./analyzers/CompositeModerationAnalyzer";
import { ModerationEngine } from "./ModerationEngine";
import { ModerationPolicy } from "./ModerationPolicy";
import { ModerationResult } from "./ModerationResult";

/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy;
 * - restituisce il risultato completo della moderazione.
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
  ): ModerationResult {
    const evidenze =
      this.analyzer.analizza(contenuto, immagine);

    const decisione =
      this.policy.valuta(evidenze);

    return new ModerationResult(
      decisione,
      evidenze
    );
  }
}