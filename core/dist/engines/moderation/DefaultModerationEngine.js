"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModerationEngine = void 0;
const ModerationAnalysisPipeline_1 = require("./ModerationAnalysisPipeline");
const ModerationContext_1 = require("./ModerationContext");
const ModerationResult_1 = require("./ModerationResult");
/**
 * Implementazione predefinita del Moderation Engine.
 *
 * Coordina l'intero processo di moderazione:
 *
 * - esegue tutti gli analyzer;
 * - raccoglie le evidenze;
 * - delega la decisione finale alla ModerationPolicy;
 * - restituisce il risultato completo della moderazione.
 */
class DefaultModerationEngine {
    policy;
    analysisPipeline = new ModerationAnalysisPipeline_1.ModerationAnalysisPipeline();
    constructor(policy) {
        this.policy = policy;
    }
    /**
     * Implementazione.
     */
    modera(arg1, arg2) {
        const context = arg1 instanceof ModerationContext_1.ModerationContext
            ? arg1
            : new ModerationContext_1.ModerationContext(arg1, arg2);
        const evidenze = this.analysisPipeline.analizza(context.userContent, context.imageAnalysis, context.contentConsistency);
        const decisione = this.policy.valuta(evidenze);
        return new ModerationResult_1.ModerationResult(decisione, evidenze);
    }
}
exports.DefaultModerationEngine = DefaultModerationEngine;
//# sourceMappingURL=DefaultModerationEngine.js.map