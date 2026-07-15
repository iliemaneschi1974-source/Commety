"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTextConsistencyAnalyzer = void 0;
const DescriptionConsistencyRule_1 = require("./rules/DescriptionConsistencyRule");
/**
 * Coordina tutte le regole di coerenza
 * tra contenuto testuale e immagini.
 *
 * L'analyzer non contiene logica di business:
 * si limita ad orchestrare le singole regole.
 */
class ImageTextConsistencyAnalyzer {
    rules = [
        new DescriptionConsistencyRule_1.DescriptionConsistencyRule(),
    ];
    analizza(contenuto, immagine, consistency) {
        const evidenze = [];
        for (const rule of this.rules) {
            evidenze.push(...rule.analizza(contenuto, immagine, consistency));
        }
        return evidenze;
    }
}
exports.ImageTextConsistencyAnalyzer = ImageTextConsistencyAnalyzer;
//# sourceMappingURL=ImageTextConsistencyAnalyzer.js.map