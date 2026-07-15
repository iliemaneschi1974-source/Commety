"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenshotRule = void 0;
const ModerationEvidence_1 = require("../../../ModerationEvidence");
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva la presenza di screenshot
 * all'interno delle immagini.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class ScreenshotRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.screenshot < ImageModerationThresholds_1.ImageModerationThresholds.SCREENSHOT) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("SCREENSHOT", "Screenshot rilevato.", analisi.screenshot, "IMMAGINE"),
        ];
    }
}
exports.ScreenshotRule = ScreenshotRule;
//# sourceMappingURL=ScreenshotRule.js.map