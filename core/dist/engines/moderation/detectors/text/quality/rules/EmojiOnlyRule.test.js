"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const UserContent_1 = require("../../../../../../domain/UserContent");
const EmojiOnlyRule_1 = require("./EmojiOnlyRule");
const rule = new EmojiOnlyRule_1.EmojiOnlyRule();
(0, vitest_1.describe)("EmojiOnlyRule", () => {
    (0, vitest_1.it)("rileva un contenuto composto solo da emoji", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("😀😀😀😀😀", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(1);
        (0, vitest_1.expect)(evidenze[0].tipo).toBe("SOLO_EMOJI");
    });
    (0, vitest_1.it)("non segnala un testo normale", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente sulla A1", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("non segnala un testo con emoji", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("🚗 Incidente sulla A1", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("ignora un contenuto vuoto", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
});
//# sourceMappingURL=EmojiOnlyRule.test.js.map