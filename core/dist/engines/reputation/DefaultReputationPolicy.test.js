"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultReputationPolicy_1 = require("./DefaultReputationPolicy");
const ReputationEvidence_1 = require("./ReputationEvidence");
(0, vitest_1.describe)("DefaultReputationPolicy", () => {
    const policy = new DefaultReputationPolicy_1.DefaultReputationPolicy();
    (0, vitest_1.it)("assegna una fiducia standard quando non sono presenti evidenze", () => {
        const decision = policy.valuta([]);
        (0, vitest_1.expect)(decision.isFiduciaStandard()).toBe(true);
    });
    (0, vitest_1.it)("assegna alta fiducia quando tutte le evidenze sono positive", () => {
        const decision = policy.valuta([
            new ReputationEvidence_1.ReputationEvidence("STORICO_AFFIDABILE", "", 1, "LIFECYCLE"),
            new ReputationEvidence_1.ReputationEvidence("SEGNALAZIONI_PRECISE", "", 1, "PUBLICATION"),
        ]);
        (0, vitest_1.expect)(decision.isAltaFiducia()).toBe(true);
    });
    (0, vitest_1.it)("assegna non affidabile quando è presente una evidenza negativa", () => {
        const decision = policy.valuta([
            new ReputationEvidence_1.ReputationEvidence("SPAM_RECIDIVO", "", 1, "MODERATION"),
        ]);
        (0, vitest_1.expect)(decision.isNonAffidabile()).toBe(true);
    });
    (0, vitest_1.it)("assegna non affidabile quando sono presenti evidenze positive e negative", () => {
        const decision = policy.valuta([
            new ReputationEvidence_1.ReputationEvidence("STORICO_AFFIDABILE", "", 1, "LIFECYCLE"),
            new ReputationEvidence_1.ReputationEvidence("SPAM_RECIDIVO", "", 1, "MODERATION"),
        ]);
        (0, vitest_1.expect)(decision.isNonAffidabile()).toBe(true);
    });
});
//# sourceMappingURL=DefaultReputationPolicy.test.js.map