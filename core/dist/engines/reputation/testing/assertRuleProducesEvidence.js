"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRuleProducesEvidence = assertRuleProducesEvidence;
const vitest_1 = require("vitest");
/**
 * Verifica che una ReputationRule produca
 * una singola evidenza del tipo atteso.
 *
 * Utility utilizzata esclusivamente
 * all'interno della suite di test.
 */
function assertRuleProducesEvidence(rule, context, expectedEvidence) {
    const evidenze = rule.analizza(context);
    (0, vitest_1.expect)(evidenze).toHaveLength(1);
    (0, vitest_1.expect)(evidenze[0].tipo).toBe(expectedEvidence);
}
//# sourceMappingURL=assertRuleProducesEvidence.js.map