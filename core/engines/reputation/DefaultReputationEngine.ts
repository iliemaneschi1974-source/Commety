import { CompositeReputationAnalyzer } from "./CompositeReputationAnalyzer";
import { ReputationContext } from "./ReputationContext";
import { ReputationEngine } from "./ReputationEngine";
import { ReputationPolicy } from "./ReputationPolicy";
import { ReputationProfile } from "./ReputationProfile";
import { ReputationSignal } from "./ReputationSignal";

/**
 * Implementazione predefinita del Reputation Engine.
 *
 * Coordina l'intero processo di valutazione della reputazione
 * senza contenere logica decisionale.
 */
export class DefaultReputationEngine implements ReputationEngine {
  constructor(
    private readonly analyzer: CompositeReputationAnalyzer,
    private readonly policy: ReputationPolicy
  ) {}

  valuta(
    segnali: readonly ReputationSignal[]
  ): ReputationProfile {
    const contesto = new ReputationContext(segnali);

    const evidenze = this.analyzer.analizza(contesto);

    const decision = this.policy.valuta(evidenze);

    return new ReputationProfile(
      decision,
      evidenze,
      new Date()
    );
  }
}