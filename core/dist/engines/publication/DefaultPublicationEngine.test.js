"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultPublicationEngine_1 = require("./DefaultPublicationEngine");
const DefaultPublicationPolicy_1 = require("./DefaultPublicationPolicy");
const engine = new DefaultPublicationEngine_1.DefaultPublicationEngine(new DefaultPublicationPolicy_1.DefaultPublicationPolicy());
function evidence(trust) {
    return {
        trust: {
            value: trust,
            confidence: 1,
            reason: "",
        },
    };
}
(0, vitest_1.describe)("DefaultPublicationEngine", () => {
    (0, vitest_1.it)("pubblica la segnalazione con trust elevato", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.95))).toBe("PUBBLICA");
    });
    (0, vitest_1.it)("pubblica con riserva per trust medio-alto", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.75))).toBe("PUBBLICA_CON_RISERVA");
    });
    (0, vitest_1.it)("richiede conferme per trust medio", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.55))).toBe("RICHIEDI_CONFERME");
    });
    (0, vitest_1.it)("invia in revisione per trust basso", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.35))).toBe("REVISIONE");
    });
    (0, vitest_1.it)("rifiuta la segnalazione sotto la soglia minima", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.20))).toBe("RIFIUTA");
    });
    (0, vitest_1.it)("pubblica esattamente sulla soglia", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.90))).toBe("PUBBLICA");
    });
    (0, vitest_1.it)("pubblica con riserva esattamente sulla soglia", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.70))).toBe("PUBBLICA_CON_RISERVA");
    });
    (0, vitest_1.it)("richiede conferme esattamente sulla soglia", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.50))).toBe("RICHIEDI_CONFERME");
    });
    (0, vitest_1.it)("invia in revisione esattamente sulla soglia", () => {
        (0, vitest_1.expect)(engine.decide(evidence(0.30))).toBe("REVISIONE");
    });
});
//# sourceMappingURL=DefaultPublicationEngine.test.js.map