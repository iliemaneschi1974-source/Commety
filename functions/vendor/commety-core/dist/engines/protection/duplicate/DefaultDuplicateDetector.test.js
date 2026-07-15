"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultDuplicateDetector_1 = require("./DefaultDuplicateDetector");
const detector = new DefaultDuplicateDetector_1.DefaultDuplicateDetector();
function candidate(overrides = {}) {
    return {
        id: "report-1",
        category: "traffico",
        title: "Incidente sulla Tiburtina",
        latitude: 41.9100,
        longitude: 12.5300,
        occurredAt: new Date("2026-07-03T10:00:00Z"),
        ...overrides,
    };
}
(0, vitest_1.describe)("DefaultDuplicateDetector", () => {
    (0, vitest_1.it)("detects a duplicate when all conditions match", () => {
        const result = detector.analyze(candidate(), [
            candidate({
                id: "report-2",
            }),
        ]);
        (0, vitest_1.expect)(result.isDuplicate).toBe(true);
        (0, vitest_1.expect)(result.confidence).toBe(1);
        (0, vitest_1.expect)(result.matchedReportId).toBe("report-2");
    });
    (0, vitest_1.it)("returns false when categories differ", () => {
        const result = detector.analyze(candidate(), [
            candidate({
                id: "report-2",
                category: "meteo",
            }),
        ]);
        (0, vitest_1.expect)(result.isDuplicate).toBe(false);
    });
    (0, vitest_1.it)("returns false when titles differ", () => {
        const result = detector.analyze(candidate(), [
            candidate({
                id: "report-2",
                title: "Coda sul raccordo",
            }),
        ]);
        (0, vitest_1.expect)(result.isDuplicate).toBe(false);
    });
    (0, vitest_1.it)("returns false when reports are too far apart in time", () => {
        const result = detector.analyze(candidate(), [
            candidate({
                id: "report-2",
                occurredAt: new Date("2026-07-03T11:00:00Z"),
            }),
        ]);
        (0, vitest_1.expect)(result.isDuplicate).toBe(false);
    });
    (0, vitest_1.it)("returns false when reports are too far apart geographically", () => {
        const result = detector.analyze(candidate(), [
            candidate({
                id: "report-2",
                latitude: 45.4642,
                longitude: 9.1900,
            }),
        ]);
        (0, vitest_1.expect)(result.isDuplicate).toBe(false);
    });
    (0, vitest_1.it)("returns false when there are no nearby reports", () => {
        const result = detector.analyze(candidate(), []);
        (0, vitest_1.expect)(result.isDuplicate).toBe(false);
        (0, vitest_1.expect)(result.confidence).toBe(0);
        (0, vitest_1.expect)(result.matchedReportId).toBeUndefined();
    });
    (0, vitest_1.it)("ignores case and extra spaces in titles", () => {
        const result = detector.analyze(candidate(), [
            candidate({
                id: "report-2",
                title: "  incidente   SULLA   tiburtina ",
            }),
        ]);
        (0, vitest_1.expect)(result.isDuplicate).toBe(true);
    });
});
//# sourceMappingURL=DefaultDuplicateDetector.test.js.map