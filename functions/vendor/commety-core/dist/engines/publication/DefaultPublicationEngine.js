"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultPublicationEngine = void 0;
/**
 * Implementazione predefinita del motore
 * di decisione della pubblicazione.
 */
class DefaultPublicationEngine {
    policy;
    constructor(policy) {
        this.policy = policy;
    }
    decide(evidence) {
        const trust = evidence.trust.value;
        if (trust >= this.policy.getPublishThreshold()) {
            return "PUBBLICA";
        }
        if (trust >=
            this.policy.getPublishWithReservationThreshold()) {
            return "PUBBLICA_CON_RISERVA";
        }
        if (trust >=
            this.policy.getConfirmationThreshold()) {
            return "RICHIEDI_CONFERME";
        }
        if (trust >= this.policy.getReviewThreshold()) {
            return "REVISIONE";
        }
        return "RIFIUTA";
    }
}
exports.DefaultPublicationEngine = DefaultPublicationEngine;
//# sourceMappingURL=DefaultPublicationEngine.js.map