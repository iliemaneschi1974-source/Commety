"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const SegnalazioniPreciseRule_1 = require("./SegnalazioniPreciseRule");
const ReputationContextBuilder_1 = require("../testing/ReputationContextBuilder");
const assertRuleProducesEvidence_1 = require("../testing/assertRuleProducesEvidence");
(0, vitest_1.describe)("SegnalazioniPreciseRule", () => {
    const rule = new SegnalazioniPreciseRule_1.SegnalazioniPreciseRule();
    (0, vitest_1.it)("non produce evidenze quando non sono presenti segnalazioni precise", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create().build();
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("produce SEGNALAZIONI_PRECISE quando è presente una segnalazione precisa", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conSegnalazionePrecisa()
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "SEGNALAZIONI_PRECISE");
    });
});
//# sourceMappingURL=SegnalazioniPreciseRule.test.js.map