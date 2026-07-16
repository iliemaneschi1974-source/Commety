import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";

import { ModerationAnalysisPipeline } from "./ModerationAnalysisPipeline";
import { ModerationContext } from "./ModerationContext";
import { ModerationEngine } from "./ModerationEngine";
import { ModerationPolicy } from "./ModerationPolicy";
import { ModerationResult } from "./ModerationResult";

/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 *
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy;
 * - restituisce il risultato completo della moderazione.
 */
export class DefaultModerationEngine
  implements ModerationEngine
{
  private readonly analysisPipeline =
    new ModerationAnalysisPipeline();

  constructor(
    private readonly policy: ModerationPolicy
  ) {}

  /**
   * Nuova API.
   */
  modera(
    context: ModerationContext
  ): ModerationResult;

  /**
   * API legacy.
   */
  modera(
    contenuto: UserContent,
    immagine?: ImageAnalysis
  ): ModerationResult;

  /**
   * Implementazione.
   */
  modera(
    arg1: ModerationContext | UserContent,
    arg2?: ImageAnalysis
  ): ModerationResult {

    const context =
      arg1 instanceof ModerationContext
        ? arg1
        : new ModerationContext(
            arg1,
            arg2
          );

    const evidenze =
      this.analysisPipeline.analizza(
        context.userContent,
        context.imageAnalysis,
        context.contentConsistency
      );

    const decisione =
      this.policy.valuta(evidenze);

    return new ModerationResult(
      decisione,
      evidenze
    );

  }

}