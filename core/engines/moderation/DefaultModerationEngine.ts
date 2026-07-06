import { ModerationDecision } from "./ModerationDecision";
import { ModerationEngine } from "./ModerationEngine";
import { ModerationEvidence } from "./ModerationEvidence";
import { ModerationPolicy } from "./ModerationPolicy";

/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina il processo di moderazione delegando
 * l'interpretazione delle evidenze alla Policy.
 */
export class DefaultModerationEngine implements ModerationEngine {
  constructor(
    private readonly policy: ModerationPolicy
  ) {}

  modera(
    evidenze: readonly ModerationEvidence[]
  ): ModerationDecision {
    return this.policy.valuta(evidenze);
  }
}