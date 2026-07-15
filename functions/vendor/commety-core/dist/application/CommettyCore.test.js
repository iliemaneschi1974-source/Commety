"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const CommettyCore_1 = require("./CommettyCore");
(0, vitest_1.describe)("CommettyCore", () => {
    (0, vitest_1.it)("should process an observation and return assessments", async () => {
        // Arrange
        const core = new CommettyCore_1.CommettyCore();
        const observation = {
            id: "obs-1",
            source: {
                id: "user-1",
                type: "USER",
            },
            status: "RECEIVED",
        };
        // Act
        const assessments = await core.process(observation);
        // Assert
        (0, vitest_1.expect)(assessments).toHaveLength(1);
        (0, vitest_1.expect)(assessments[0].category).toBe("SOURCE");
        (0, vitest_1.expect)(assessments[0].outcome).toBe("POSITIVE");
        (0, vitest_1.expect)(assessments[0].confidence).toBe("HIGH");
        (0, vitest_1.expect)(assessments[0].reason).toContain("supported");
    });
});
//# sourceMappingURL=CommettyCore.test.js.map