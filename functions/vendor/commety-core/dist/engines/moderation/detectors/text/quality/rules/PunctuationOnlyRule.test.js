"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const UserContent_1 = require("../../../../../../domain/UserContent");
const PunctuationOnlyRule_1 = require("./PunctuationOnlyRule");
const rule = new PunctuationOnlyRule_1.PunctuationOnlyRule();
(0, vitest_1.describe)("PunctuationOnlyRule", () => {
    (0, vitest_1.it)("rileva un contenuto composto solo da punteggiatura", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("...........", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(1);
        (0, vitest_1.expect)(evidenze[0].tipo).toBe("SOLO_PUNTEGGIATURA");
    });
    (0, vitest_1.it)("non segnala un testo normale", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente sulla Cassia", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("non segnala un testo con punteggiatura", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente!!!", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("ignora un contenuto vuoto", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
});
//# sourceMappingURL=PunctuationOnlyRule.test.js.map