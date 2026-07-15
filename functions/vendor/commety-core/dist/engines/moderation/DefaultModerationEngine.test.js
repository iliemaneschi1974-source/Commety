"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const UserContent_1 = require("../../domain/UserContent");
const DefaultModerationEngine_1 = require("./DefaultModerationEngine");
const DefaultModerationPolicy_1 = require("./DefaultModerationPolicy");
const engine = new DefaultModerationEngine_1.DefaultModerationEngine(new DefaultModerationPolicy_1.DefaultModerationPolicy());
(0, vitest_1.describe)("DefaultModerationEngine", () => {
    (0, vitest_1.it)("approva un contenuto pulito", () => {
        const result = engine.modera(new UserContent_1.UserContent("Traffico rallentato sulla Tangenziale.", []));
        (0, vitest_1.expect)(result.isApproved()).toBe(true);
        (0, vitest_1.expect)(result.evidences).toHaveLength(0);
    });
    (0, vitest_1.it)("approva un contenuto vuoto", () => {
        const result = engine.modera(new UserContent_1.UserContent());
        (0, vitest_1.expect)(result.isApproved()).toBe(true);
        (0, vitest_1.expect)(result.evidences).toHaveLength(0);
    });
});
//# sourceMappingURL=DefaultModerationEngine.test.js.map