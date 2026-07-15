"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionConsistencyRule = void 0;
const ModerationEvidence_1 = require("../../../ModerationEvidence");
const ImageModerationThresholds_1 = require("../../../detectors/image/ImageModerationThresholds");
/**
 * Verifica la coerenza semantica tra
 * il contenuto testuale della segnalazione
 * e il contenuto riconosciuto nelle immagini.
 */
class DescriptionConsistencyRule {
    analizza(contenuto, immagine, consistency) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        if (!immagine.descrizione) {
            return [];
        }
        if (!consistency) {
            return [];
        }
        const soglia = ImageModerationThresholds_1.ImageModerationThresholds.IMAGE_CONSISTENCY;
        if (consistency.descriptionSimilarity >= soglia &&
            consistency.titleSimilarity >= soglia &&
            consistency.categorySimilarity >= soglia) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("IMMAGINE_NON_COERENTE", "L'immagine non risulta coerente con il contenuto della segnalazione.", consistency.confidence, "AI")
        ];
    }
}
exports.DescriptionConsistencyRule = DescriptionConsistencyRule;
//# sourceMappingURL=DescriptionConsistencyRule.js.map