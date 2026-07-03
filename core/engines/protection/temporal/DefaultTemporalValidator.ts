import {
  TemporalAnalysis,
  TemporalCandidate,
  TemporalValidator,
} from "./TemporalValidator";
import { TemporalPolicy } from "./TemporalPolicy";

/**
 * Implementazione predefinita del validatore temporale.
 *
 * Applica una TemporalPolicy per determinare se una
 * segnalazione è ancora temporalmente plausibile.
 */
export class DefaultTemporalValidator implements TemporalValidator {
  constructor(
    private readonly policy: TemporalPolicy,
  ) {}

  analyze(
    candidate: TemporalCandidate,
    currentTime: Date,
  ): TemporalAnalysis {
    const maximumDuration =
      this.policy.getValidityDuration(candidate.category);

    const age =
      currentTime.getTime() - candidate.occurredAt.getTime();

    const isValid = age <= maximumDuration;

    return {
      isValid,
      confidence: isValid ? 1 : 0,
      reason: isValid
        ? "La segnalazione è ancora temporalmente valida."
        : "La segnalazione ha superato la durata massima prevista.",
    };
  }
}