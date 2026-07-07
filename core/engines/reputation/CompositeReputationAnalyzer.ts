import { ReputationContext } from "./ReputationContext";
import { ReputationEvidence } from "./ReputationEvidence";
import { ReputationRule } from "./rules/ReputationRule";

/**
 * Analizzatore composito del Reputation Engine.
 *
 * Coordina l'esecuzione delle ReputationRule senza
 * conoscere la logica implementativa delle singole regole.
 */
export class CompositeReputationAnalyzer {
  constructor(
    private readonly rules: readonly ReputationRule[]
  ) {}

  /**
   * Analizza il contesto ricevuto eseguendo tutte
   * le regole configurate.
   */
  analizza(
    contesto: ReputationContext
  ): readonly ReputationEvidence[] {
    return this.rules.flatMap((rule) => rule.analizza(contesto));
  }
}