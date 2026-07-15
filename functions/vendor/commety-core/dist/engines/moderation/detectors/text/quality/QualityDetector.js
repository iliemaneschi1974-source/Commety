"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityDetector = void 0;
const EmojiOnlyRule_1 = require("./rules/EmojiOnlyRule");
const GibberishRule_1 = require("./rules/GibberishRule");
const MinimumLengthRule_1 = require("./rules/MinimumLengthRule");
const PunctuationOnlyRule_1 = require("./rules/PunctuationOnlyRule");
const TooShortTextRule_1 = require("./rules/TooShortTextRule");
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Quality.
 */
class QualityDetector {
    rules = [
        new MinimumLengthRule_1.MinimumLengthRule(),
        new TooShortTextRule_1.TooShortTextRule(),
        new PunctuationOnlyRule_1.PunctuationOnlyRule(),
        new EmojiOnlyRule_1.EmojiOnlyRule(),
        new GibberishRule_1.GibberishRule(),
    ];
    /**
     * Analizza il contenuto utilizzando tutte
     * le regole della famiglia Quality.
     */
    analizza(contenuto) {
        const evidenze = [];
        for (const rule of this.rules) {
            evidenze.push(...rule.analizza(contenuto));
        }
        return evidenze;
    }
}
exports.QualityDetector = QualityDetector;
//# sourceMappingURL=QualityDetector.js.map