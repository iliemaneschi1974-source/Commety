import { TemporalAnalysis, TemporalCandidate, TemporalValidator } from "./TemporalValidator";
import { TemporalPolicy } from "./TemporalPolicy";
/**
 * Implementazione predefinita del validatore temporale.
 *
 * Applica una TemporalPolicy per determinare se una
 * segnalazione è ancora temporalmente plausibile.
 */
export declare class DefaultTemporalValidator implements TemporalValidator {
    private readonly policy;
    constructor(policy: TemporalPolicy);
    analyze(candidate: TemporalCandidate, currentTime: Date): TemporalAnalysis;
}
//# sourceMappingURL=DefaultTemporalValidator.d.ts.map