"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ReportSmentitoRule_1 = require("./ReportSmentitoRule");
const ReputationContextBuilder_1 = require("../testing/ReputationContextBuilder");
const assertRuleProducesEvidence_1 = require("../testing/assertRuleProducesEvidence");
(0, vitest_1.describe)("ReportSmentitoRule", () => {
    const rule = new ReportSmentitoRule_1.ReportSmentitoRule();
    (0, vitest_1.it)("non produce evidenze quando non sono presenti report smentiti", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create().build();
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("produce FIDUCIA_IN_DIMINUZIONE quando è presente un report smentito", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conReportSmentito()
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "FIDUCIA_IN_DIMINUZIONE");
    });
});
//# sourceMappingURL=ReportSmentitoRule.test.js.map