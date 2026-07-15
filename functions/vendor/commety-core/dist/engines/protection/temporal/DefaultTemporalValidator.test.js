"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultTemporalValidator_1 = require("./DefaultTemporalValidator");
class FakeTemporalPolicy {
    getValidityDuration() {
        return 60 * 60 * 1000; // 1 ora
    }
}
const validator = new DefaultTemporalValidator_1.DefaultTemporalValidator(new FakeTemporalPolicy());
function candidate(overrides = {}) {
    return {
        category: "traffico",
        occurredAt: new Date("2026-07-03T10:00:00Z"),
        ...overrides,
    };
}
(0, vitest_1.describe)("DefaultTemporalValidator", () => {
    (0, vitest_1.it)("considera valida una segnalazione entro la durata prevista", () => {
        const result = validator.analyze(candidate(), new Date("2026-07-03T10:30:00Z"));
        (0, vitest_1.expect)(result.isValid).toBe(true);
        (0, vitest_1.expect)(result.confidence).toBe(1);
    });
    (0, vitest_1.it)("considera non valida una segnalazione oltre la durata prevista", () => {
        const result = validator.analyze(candidate(), new Date("2026-07-03T11:30:01Z"));
        (0, vitest_1.expect)(result.isValid).toBe(false);
        (0, vitest_1.expect)(result.confidence).toBe(0);
    });
    (0, vitest_1.it)("considera valida una segnalazione esattamente al limite", () => {
        const result = validator.analyze(candidate(), new Date("2026-07-03T11:00:00Z"));
        (0, vitest_1.expect)(result.isValid).toBe(true);
    });
    (0, vitest_1.it)("restituisce sempre una motivazione", () => {
        const result = validator.analyze(candidate(), new Date("2026-07-03T10:15:00Z"));
        (0, vitest_1.expect)(result.reason.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=DefaultTemporalValidator.test.js.map