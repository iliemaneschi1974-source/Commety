"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const DefaultProtectionEngine_1 = require("./DefaultProtectionEngine");
(0, vitest_1.describe)("DefaultProtectionEngine", () => {
    (0, vitest_1.it)("should execute all protection validators", async () => {
        // Arrange
        const engine = new DefaultProtectionEngine_1.DefaultProtectionEngine();
        const observation = {
            id: "obs-1",
            source: {
                id: "user-1",
                type: "USER",
            },
            status: "RECEIVED",
        };
        // Act
        const assessments = await engine.analyze(observation);
        // Assert
        (0, vitest_1.expect)(assessments).toHaveLength(1);
        (0, vitest_1.expect)(assessments[0].category).toBe("SOURCE");
        (0, vitest_1.expect)(assessments[0].outcome).toBe("POSITIVE");
        (0, vitest_1.expect)(assessments[0].confidence).toBe("HIGH");
    });
});
//# sourceMappingURL=DefaultProtectionEngine.test.js.map