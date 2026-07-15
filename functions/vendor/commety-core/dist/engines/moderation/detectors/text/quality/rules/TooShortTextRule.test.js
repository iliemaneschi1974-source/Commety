"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const UserContent_1 = require("../../../../../../domain/UserContent");
const TooShortTextRule_1 = require("./TooShortTextRule");
const rule = new TooShortTextRule_1.TooShortTextRule();
(0, vitest_1.describe)("TooShortTextRule", () => {
    (0, vitest_1.it)("rileva un testo troppo breve", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("test", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(1);
        (0, vitest_1.expect)(evidenze[0].tipo).toBe("TESTO_TROPPO_BREVE");
    });
    (0, vitest_1.it)("rileva un testo troppo breve nella descrizione", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente\ntest", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(1);
        (0, vitest_1.expect)(evidenze[0].tipo).toBe("TESTO_TROPPO_BREVE");
    });
    (0, vitest_1.it)("non segnala una segnalazione composta da una sola parola significativa", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Incidente", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("non segnala un testo normale", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("Traffico intenso sulla A1", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
    (0, vitest_1.it)("ignora un contenuto vuoto", () => {
        const evidenze = rule.analizza(new UserContent_1.UserContent("", []));
        (0, vitest_1.expect)(evidenze).toHaveLength(0);
    });
});
//# sourceMappingURL=TooShortTextRule.test.js.map