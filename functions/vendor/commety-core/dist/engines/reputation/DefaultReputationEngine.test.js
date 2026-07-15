"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const CompositeReputationAnalyzer_1 = require("./CompositeReputationAnalyzer");
const DefaultReputationEngine_1 = require("./DefaultReputationEngine");
const DefaultReputationPolicy_1 = require("./DefaultReputationPolicy");
const ReputationContextBuilder_1 = require("./testing/ReputationContextBuilder");
const ReportConfermatoNelTempoRule_1 = require("./rules/ReportConfermatoNelTempoRule");
const SpamRecidivoRule_1 = require("./rules/SpamRecidivoRule");
(0, vitest_1.describe)("DefaultReputationEngine", () => {
    const engine = new DefaultReputationEngine_1.DefaultReputationEngine(new CompositeReputationAnalyzer_1.CompositeReputationAnalyzer([
        new ReportConfermatoNelTempoRule_1.ReportConfermatoNelTempoRule(),
        new SpamRecidivoRule_1.SpamRecidivoRule(),
    ]), new DefaultReputationPolicy_1.DefaultReputationPolicy());
    (0, vitest_1.it)("assegna una fiducia standard quando non sono presenti segnali", () => {
        const profile = engine.valuta(ReputationContextBuilder_1.ReputationContextBuilder.create().build().segnali);
        (0, vitest_1.expect)(profile.decision.isFiduciaStandard()).toBe(true);
    });
    (0, vitest_1.it)("assegna alta fiducia quando sono presenti solo segnali positivi", () => {
        const profile = engine.valuta(ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conReportConfermatoNelTempo()
            .build().segnali);
        (0, vitest_1.expect)(profile.decision.isAltaFiducia()).toBe(true);
    });
    (0, vitest_1.it)("assegna un profilo non affidabile quando è presente uno spam", () => {
        const profile = engine.valuta(ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conSpam()
            .build().segnali);
        (0, vitest_1.expect)(profile.decision.isNonAffidabile()).toBe(true);
    });
});
//# sourceMappingURL=DefaultReputationEngine.test.js.map