"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModerationEngine = void 0;
const CompositeModerationAnalyzer_1 = require("./analyzers/CompositeModerationAnalyzer");
const ModerationResult_1 = require("./ModerationResult");
/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy;
 * - restituisce il risultato completo della moderazione.
 */
class DefaultModerationEngine {
    policy;
    analyzer = new CompositeModerationAnalyzer_1.CompositeModerationAnalyzer();
    constructor(policy) {
        this.policy = policy;
    }
    modera(contenuto, immagine) {
        const evidenze = this.analyzer.analizza(contenuto, immagine);
        const decisione = this.policy.valuta(evidenze);
        return new ModerationResult_1.ModerationResult(decisione, evidenze);
    }
}
exports.DefaultModerationEngine = DefaultModerationEngine;
//# sourceMappingURL=DefaultModerationEngine.js.map