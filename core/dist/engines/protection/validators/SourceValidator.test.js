"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const SourceValidator_1 = require("./SourceValidator");
(0, vitest_1.describe)("SourceValidator", () => {
    (0, vitest_1.it)("should accept a USER source", async () => {
        const validator = new SourceValidator_1.SourceValidator();
        const observation = {
            id: "obs-1",
            source: {
                id: "user-1",
                type: "USER",
            },
            status: "RECEIVED",
        };
        const assessments = await validator.analyze(observation);
        (0, vitest_1.expect)(assessments).toHaveLength(1);
        (0, vitest_1.expect)(assessments[0].category).toBe("SOURCE");
        (0, vitest_1.expect)(assessments[0].outcome).toBe("POSITIVE");
        (0, vitest_1.expect)(assessments[0].confidence).toBe("HIGH");
    });
});
//# sourceMappingURL=SourceValidator.test.js.map