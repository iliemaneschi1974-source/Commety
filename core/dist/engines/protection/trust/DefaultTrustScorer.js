"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTrustScorer = void 0;
/**
 * Implementazione predefinita del motore di valutazione
 * dell'affidabilità di una segnalazione.
 */
class DefaultTrustScorer {
    policy;
    constructor(policy) {
        this.policy = policy;
    }
    score(evidence) {
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
    buildReason(value) {
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
exports.DefaultTrustScorer = DefaultTrustScorer;
//# sourceMappingURL=DefaultTrustScorer.js.map