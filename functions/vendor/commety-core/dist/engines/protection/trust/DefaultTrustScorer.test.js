"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultTrustPolicy_1 = require("./DefaultTrustPolicy");
const DefaultTrustScorer_1 = require("./DefaultTrustScorer");
const scorer = new DefaultTrustScorer_1.DefaultTrustScorer(new DefaultTrustPolicy_1.DefaultTrustPolicy());
function evidence(overrides = {}) {
    return {
        duplicate: {
            isDuplicate: false,
            confidence: 1,
            reason: "",
        },
        temporal: {
            isValid: true,
            confidence: 1,
            reason: "",
        },
        spatial: {
            isValid: true,
            confidence: 1,
            reason: "",
        },
        ...overrides,
    };
}
(0, vitest_1.describe)("DefaultTrustScorer", () => {
    (0, vitest_1.it)("assegna il punteggio massimo quando tutte le evidenze sono positive", () => {
        const result = scorer.score(evidence());
        (0, vitest_1.expect)(result.value).toBe(1);
        (0, vitest_1.expect)(result.confidence).toBe(1);
    });
    (0, vitest_1.it)("riduce il punteggio quando il report è un duplicato", () => {
        const result = scorer.score(evidence({
            duplicate: {
                isDuplicate: true,
                confidence: 1,
                reason: "",
            },
        }));
        (0, vitest_1.expect)(result.value).toBe(0.5);
    });
    (0, vitest_1.it)("riduce il punteggio quando la validità temporale fallisce", () => {
        const result = scorer.score(evidence({
            temporal: {
                isValid: false,
                confidence: 1,
                reason: "",
            },
        }));
        (0, vitest_1.expect)(result.value).toBe(0.75);
    });
    (0, vitest_1.it)("riduce il punteggio quando la validità spaziale fallisce", () => {
        const result = scorer.score(evidence({
            spatial: {
                isValid: false,
                confidence: 1,
                reason: "",
            },
        }));
        (0, vitest_1.expect)(result.value).toBe(0.75);
    });
    (0, vitest_1.it)("restituisce sempre una motivazione", () => {
        const result = scorer.score(evidence());
        (0, vitest_1.expect)(result.reason.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=DefaultTrustScorer.test.js.map