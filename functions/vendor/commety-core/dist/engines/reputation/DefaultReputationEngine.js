"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultReputationEngine = void 0;
const ReputationContext_1 = require("./ReputationContext");
const ReputationProfile_1 = require("./ReputationProfile");
/**
 * Implementazione predefinita del Reputation Engine.
 *
 * Coordina l'intero processo di valutazione della reputazione
 * senza contenere logica decisionale.
 */
class DefaultReputationEngine {
    analyzer;
    policy;
    constructor(analyzer, policy) {
        this.analyzer = analyzer;
        this.policy = policy;
    }
    valuta(segnali) {
        const contesto = new ReputationContext_1.ReputationContext(segnali);
        const evidenze = this.analyzer.analizza(contesto);
        const decision = this.policy.valuta(evidenze);
        return new ReputationProfile_1.ReputationProfile(decision, evidenze, new Date());
    }
}
exports.DefaultReputationEngine = DefaultReputationEngine;
//# sourceMappingURL=DefaultReputationEngine.js.map