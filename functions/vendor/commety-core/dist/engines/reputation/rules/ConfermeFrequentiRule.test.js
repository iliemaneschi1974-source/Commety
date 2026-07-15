"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ConfermeFrequentiRule_1 = require("./ConfermeFrequentiRule");
const ReputationContextBuilder_1 = require("../testing/ReputationContextBuilder");
const assertRuleProducesEvidence_1 = require("../testing/assertRuleProducesEvidence");
(0, vitest_1.describe)("ConfermeFrequentiRule", () => {
    const rule = new ConfermeFrequentiRule_1.ConfermeFrequentiRule();
    (0, vitest_1.it)("non produce evidenze quando le conferme sono inferiori alla soglia", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conConfermaCommunity(9)
            .build();
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("produce CONFERME_FREQUENTI quando le conferme raggiungono la soglia", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conConfermaCommunity(10)
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "CONFERME_FREQUENTI");
    });
    (0, vitest_1.it)("produce CONFERME_FREQUENTI quando le conferme superano la soglia", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conConfermaCommunity(15)
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "CONFERME_FREQUENTI");
    });
});
//# sourceMappingURL=ConfermeFrequentiRule.test.js.map