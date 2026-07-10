"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const SpamRecidivoRule_1 = require("./SpamRecidivoRule");
const ReputationContextBuilder_1 = require("../testing/ReputationContextBuilder");
const assertRuleProducesEvidence_1 = require("../testing/assertRuleProducesEvidence");
(0, vitest_1.describe)("SpamRecidivoRule", () => {
    const rule = new SpamRecidivoRule_1.SpamRecidivoRule();
    (0, vitest_1.it)("non produce evidenze quando non sono presenti segnalazioni di spam", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create().build();
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("produce SPAM_RECIDIVO quando è presente una segnalazione di spam", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conSpam()
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "SPAM_RECIDIVO");
    });
});
//# sourceMappingURL=SpamRecidivoRule.test.js.map