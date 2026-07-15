"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTextQualityScorer = void 0;
const CompositeTextQualityEvaluator_1 = require("./CompositeTextQualityEvaluator");
const TextQualityScore_1 = require("./TextQualityScore");
const ConsonantSequenceEvaluator_1 = require("./evaluators/ConsonantSequenceEvaluator");
const KeyboardPatternEvaluator_1 = require("./evaluators/KeyboardPatternEvaluator");
const RepeatedCharacterEvaluator_1 = require("./evaluators/RepeatedCharacterEvaluator");
const RepetitionEvaluator_1 = require("./evaluators/RepetitionEvaluator");
const RoadVocabularyEvaluator_1 = require("./evaluators/RoadVocabularyEvaluator");
const VowelRatioEvaluator_1 = require("./evaluators/VowelRatioEvaluator");
/**
 * ============================================================================
 * SHARED
 * ----------------------------------------------------------------------------
 * DefaultTextQualityScorer
 * ============================================================================
 */
class DefaultTextQualityScorer {
    evaluator = new CompositeTextQualityEvaluator_1.CompositeTextQualityEvaluator([
        new VowelRatioEvaluator_1.VowelRatioEvaluator(),
        new ConsonantSequenceEvaluator_1.ConsonantSequenceEvaluator(),
        new RepetitionEvaluator_1.RepetitionEvaluator(),
        new RepeatedCharacterEvaluator_1.RepeatedCharacterEvaluator(),
        new RoadVocabularyEvaluator_1.RoadVocabularyEvaluator(),
        new KeyboardPatternEvaluator_1.KeyboardPatternEvaluator(),
    ]);
    score(testo) {
        const contributions = this.evaluator.evaluate(testo);
        const value = contributions.reduce((total, contribution) => total + contribution.score, 0);
        return new TextQualityScore_1.TextQualityScore(value, contributions.map((contribution) => contribution.reason));
    }
}
exports.DefaultTextQualityScorer = DefaultTextQualityScorer;
//# sourceMappingURL=DefaultTextQualityScorer.js.map