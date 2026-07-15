"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ViolazioniRipetuteRule_1 = require("./ViolazioniRipetuteRule");
const ReputationContextBuilder_1 = require("../testing/ReputationContextBuilder");
const assertRuleProducesEvidence_1 = require("../testing/assertRuleProducesEvidence");
(0, vitest_1.describe)("ViolazioniRipetuteRule", () => {
    const rule = new ViolazioniRipetuteRule_1.ViolazioniRipetuteRule();
    (0, vitest_1.it)("non produce evidenze quando le violazioni sono inferiori alla soglia", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conContenutoLimitato()
            .conContenutoRimosso()
            .build();
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("produce VIOLAZIONI_RIPETUTE quando le violazioni raggiungono la soglia", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conContenutoLimitato()
            .conContenutoLimitato()
            .conContenutoRimosso()
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "VIOLAZIONI_RIPETUTE");
    });
    (0, vitest_1.it)("produce VIOLAZIONI_RIPETUTE sommando contenuti limitati e rimossi", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conContenutoLimitato()
            .conContenutoRimosso()
            .conContenutoRimosso()
            .build();
        (0, assertRuleProducesEvidence_1.assertRuleProducesEvidence)(rule, context, "VIOLAZIONI_RIPETUTE");
    });
});
//# sourceMappingURL=ViolazioniRipetuteRule.test.js.map