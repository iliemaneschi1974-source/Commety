"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ReputationContext_1 = require("../ReputationContext");
const ReportConfermatoNelTempoRule_1 = require("./ReportConfermatoNelTempoRule");
const ReputationSignalBuilder_1 = require("../testing/ReputationSignalBuilder");
(0, vitest_1.describe)("ReportConfermatoNelTempoRule", () => {
    const rule = new ReportConfermatoNelTempoRule_1.ReportConfermatoNelTempoRule();
    (0, vitest_1.it)("non produce evidenze quando il segnale non è presente", () => {
        const context = new ReputationContext_1.ReputationContext([]);
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("produce STORICO_AFFIDABILE quando è presente un report confermato nel tempo", () => {
        const context = new ReputationContext_1.ReputationContext([
            ReputationSignalBuilder_1.ReputationSignalBuilder.create()
                .reportConfermatoNelTempo()
                .build(),
        ]);
        const evidenze = rule.analizza(context);
        (0, vitest_1.expect)(evidenze).toHaveLength(1);
        (0, vitest_1.expect)(evidenze[0].tipo).toBe("STORICO_AFFIDABILE");
    });
});
//# sourceMappingURL=ReportConfermatoNelTempoRule.test.js.map