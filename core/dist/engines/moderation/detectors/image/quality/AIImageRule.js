"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIImageRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva immagini probabilmente
 * generate tramite Intelligenza Artificiale.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class AIImageRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.aiGenerated < ImageModerationThresholds_1.ImageModerationThresholds.AI_GENERATED) {
            return [];
        }
        return [
            this.creaEvidence("IMMAGINE_AI", "Immagine probabilmente generata tramite Intelligenza Artificiale.", analisi.aiGenerated)
        ];
    }
}
exports.AIImageRule = AIImageRule;
//# sourceMappingURL=AIImageRule.js.map