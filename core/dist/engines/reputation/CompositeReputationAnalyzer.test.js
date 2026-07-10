"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const CompositeReputationAnalyzer_1 = require("./CompositeReputationAnalyzer");
const ReputationContextBuilder_1 = require("./testing/ReputationContextBuilder");
const ReportConfermatoNelTempoRule_1 = require("./rules/ReportConfermatoNelTempoRule");
const SpamRecidivoRule_1 = require("./rules/SpamRecidivoRule");
(0, vitest_1.describe)("CompositeReputationAnalyzer", () => {
    (0, vitest_1.it)("non produce evidenze quando nessuna regola rileva fenomeni", () => {
        const analyzer = new CompositeReputationAnalyzer_1.CompositeReputationAnalyzer([
            new ReportConfermatoNelTempoRule_1.ReportConfermatoNelTempoRule(),
            new SpamRecidivoRule_1.SpamRecidivoRule(),
        ]);
        const evidenze = analyzer.analizza(ReputationContextBuilder_1.ReputationContextBuilder.create().build());
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("raccoglie le evidenze prodotte da tutte le regole", () => {
        const analyzer = new CompositeReputationAnalyzer_1.CompositeReputationAnalyzer([
            new ReportConfermatoNelTempoRule_1.ReportConfermatoNelTempoRule(),
            new SpamRecidivoRule_1.SpamRecidivoRule(),
        ]);
        const evidenze = analyzer.analizza(ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conReportConfermatoNelTempo()
            .conSpam()
            .build());
        (0, vitest_1.expect)(evidenze).toHaveLength(2);
        (0, vitest_1.expect)(evidenze.map((e) => e.tipo)).toEqual([
            "STORICO_AFFIDABILE",
            "SPAM_RECIDIVO",
        ]);
    });
});
//# sourceMappingURL=CompositeReputationAnalyzer.test.js.map