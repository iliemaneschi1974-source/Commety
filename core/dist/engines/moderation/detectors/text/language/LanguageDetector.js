"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageDetector = void 0;
const BestemmieRule_1 = require("./rules/BestemmieRule");
const ParolacceRule_1 = require("./rules/ParolacceRule");
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Language.
 */
class LanguageDetector {
    rules = [
        new ParolacceRule_1.ParolacceRule(),
        new BestemmieRule_1.BestemmieRule(),
    ];
    analizza(contenuto) {
        const evidenze = [];
        for (const rule of this.rules) {
            evidenze.push(...rule.analizza(contenuto));
        }
        return evidenze;
    }
}
exports.LanguageDetector = LanguageDetector;
//# sourceMappingURL=LanguageDetector.js.map