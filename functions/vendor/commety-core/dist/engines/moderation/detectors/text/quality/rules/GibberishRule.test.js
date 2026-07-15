"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const UserContent_1 = require("../../../../../../domain/UserContent");
const GibberishRule_1 = require("./GibberishRule");
const rule = new GibberishRule_1.GibberishRule();
(0, vitest_1.describe)("GibberishRule", () => {
    (0, vitest_1.it)("rileva un testo privo di significato", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("sjjkdkjdkd djdkdkjdkd", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(1);
        (0, vitest_1.expect)(evidenze[0].tipo).toBe("TESTO_NON_SIGNIFICATIVO");
    });
    (0, vitest_1.it)("non segnala un testo normale", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente sulla via Cassia", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("ignora un contenuto vuoto", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("ignora una parola significativa", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
});
//# sourceMappingURL=GibberishRule.test.js.map