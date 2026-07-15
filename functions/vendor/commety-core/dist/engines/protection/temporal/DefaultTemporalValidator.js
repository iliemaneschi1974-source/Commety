"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTemporalValidator = void 0;
/**
 * Implementazione predefinita del validatore temporale.
 *
 * Applica una TemporalPolicy per determinare se una
 * segnalazione è ancora temporalmente plausibile.
 */
class DefaultTemporalValidator {
    policy;
    constructor(policy) {
        this.policy = policy;
    }
    analyze(candidate, currentTime) {
        const maximumDuration = this.policy.getValidityDuration(candidate.category);
        const age = currentTime.getTime() - candidate.occurredAt.getTime();
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
exports.DefaultTemporalValidator = DefaultTemporalValidator;
//# sourceMappingURL=DefaultTemporalValidator.js.map