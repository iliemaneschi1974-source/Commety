import { TrustPolicy } from "./TrustPolicy";
import { TrustScorer } from "./TrustScorer";
import { TrustEvidence } from "./TrustEvidence";
import { TrustScore } from "./TrustScore";

/**
 * Implementazione predefinita del motore di valutazione
 * dell'affidabilità di una segnalazione.
 */
export class DefaultTrustScorer implements TrustScorer {
  constructor(
    private readonly policy: TrustPolicy,
  ) {}

  score(
    evidence: TrustEvidence,
  ): TrustScore {
    let value = 0;

    if (!evidence.duplicate.isDuplicate) {
      value += this.policy.getDuplicateWeight();
    }

    if (evidence.temporal.isValid) {
      value += this.policy.getTemporalWeight();
    }

    if (evidence.spatial.isValid) {
      value += this.policy.getSpatialWeight();
    }

    return {
      value,
      confidence: value,
      reason: this.buildReason(value),
    };
  }

  private buildReason(
    value: number,
  ): string {
    if (value >= 0.90) {
      return "Segnalazione altamente affidabile.";
    }

    if (value >= 0.60) {
      return "Segnalazione affidabile.";
    }

    if (value >= 0.30) {
      return "Segnalazione parzialmente affidabile.";
    }

    return "Segnalazione con affidabilità insufficiente.";
  }
}