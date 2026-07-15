"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultSpatialValidator_1 = require("./DefaultSpatialValidator");
class FakeSpatialPolicy {
    influenceRadius;
    constructor(influenceRadius) {
        this.influenceRadius = influenceRadius;
    }
    getInfluenceRadius() {
        return this.influenceRadius;
    }
}
class FakeDistanceCalculator {
    distance;
    constructor(distance) {
        this.distance = distance;
    }
    calculate(_from, _to) {
        return this.distance;
    }
}
function candidate(overrides = {}) {
    return {
        category: "traffico",
        latitude: 41.9028,
        longitude: 12.4964,
        ...overrides,
    };
}
const reference = {
    latitude: 41.9030,
    longitude: 12.4968,
};
(0, vitest_1.describe)("DefaultSpatialValidator", () => {
    (0, vitest_1.it)("considera valida una segnalazione entro il raggio di influenza", () => {
        const validator = new DefaultSpatialValidator_1.DefaultSpatialValidator(new FakeSpatialPolicy(300), new FakeDistanceCalculator(120));
        const result = validator.analyze(candidate(), reference);
        (0, vitest_1.expect)(result.isValid).toBe(true);
        (0, vitest_1.expect)(result.confidence).toBe(1);
    });
    (0, vitest_1.it)("considera non valida una segnalazione oltre il raggio di influenza", () => {
        const validator = new DefaultSpatialValidator_1.DefaultSpatialValidator(new FakeSpatialPolicy(300), new FakeDistanceCalculator(450));
        const result = validator.analyze(candidate(), reference);
        (0, vitest_1.expect)(result.isValid).toBe(false);
        (0, vitest_1.expect)(result.confidence).toBe(0);
    });
    (0, vitest_1.it)("considera valida una segnalazione esattamente al limite del raggio", () => {
        const validator = new DefaultSpatialValidator_1.DefaultSpatialValidator(new FakeSpatialPolicy(300), new FakeDistanceCalculator(300));
        const result = validator.analyze(candidate(), reference);
        (0, vitest_1.expect)(result.isValid).toBe(true);
    });
    (0, vitest_1.it)("restituisce sempre una motivazione", () => {
        const validator = new DefaultSpatialValidator_1.DefaultSpatialValidator(new FakeSpatialPolicy(300), new FakeDistanceCalculator(150));
        const result = validator.analyze(candidate(), reference);
        (0, vitest_1.expect)(result.reason.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=DefaultSpatialValidator.test.js.map