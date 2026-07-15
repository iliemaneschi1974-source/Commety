"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ReputationContextBuilder_1 = require("./testing/ReputationContextBuilder");
(0, vitest_1.describe)("ReputationContext", () => {
    (0, vitest_1.it)("riconosce la presenza di un segnale", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conReportConfermatoNelTempo()
            .build();
        (0, vitest_1.expect)(context.haSegnale("REPORT_CONFERMATO_NEL_TEMPO")).toBe(true);
    });
    (0, vitest_1.it)("restituisce tutti i segnali del tipo richiesto", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conConfermaCommunity(3)
            .build();
        (0, vitest_1.expect)(context.segnaliDiTipo("CONFERMA_COMMUNITY")).toHaveLength(3);
    });
    (0, vitest_1.it)("conta correttamente i segnali del tipo richiesto", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create()
            .conConfermaCommunity(5)
            .build();
        (0, vitest_1.expect)(context.contaSegnali("CONFERMA_COMMUNITY")).toBe(5);
    });
    (0, vitest_1.it)("restituisce zero quando il segnale non è presente", () => {
        const context = ReputationContextBuilder_1.ReputationContextBuilder.create().build();
        (0, vitest_1.expect)(context.contaSegnali("CONFERMA_COMMUNITY")).toBe(0);
    });
});
//# sourceMappingURL=ReputationContext.test.js.map