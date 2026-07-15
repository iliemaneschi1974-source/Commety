"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GibberishRule = void 0;
const DefaultTextQualityScorer_1 = require("../../../../../../shared/text/DefaultTextQualityScorer");
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva testi privi di significato.
 *
 * La regola non implementa alcun algoritmo
 * di analisi: delega completamente la
 * valutazione al Text Quality Engine.
 */
class GibberishRule {
    scorer = new DefaultTextQualityScorer_1.DefaultTextQualityScorer();
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const score = this.scorer.score(contenuto.testo);
        if (!score.isPoor()) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("TESTO_NON_SIGNIFICATIVO", "Il testo sembra privo di significato.", 0.95, "TESTO"),
        ];
    }
}
exports.GibberishRule = GibberishRule;
//# sourceMappingURL=GibberishRule.js.map