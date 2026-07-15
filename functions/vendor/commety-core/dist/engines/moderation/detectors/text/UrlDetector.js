"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlDetector = void 0;
const ModerationEvidence_1 = require("../../ModerationEvidence");
/**
 * Detector specializzato nel rilevamento
 * di URL all'interno del testo.
 */
class UrlDetector {
    /**
     * Espressione regolare semplificata per il
     * rilevamento degli URL.
     *
     * Potrà essere raffinata negli sprint futuri.
     */
    static URL_REGEX = /\b((https?:\/\/)|(www\.))?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/\S*)?\b/;
    analizza(testo) {
        if (!UrlDetector.URL_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("LINK_MULTIPLI", "È stato rilevato almeno un URL nel testo.", 1, "TESTO"),
        ];
    }
}
exports.UrlDetector = UrlDetector;
//# sourceMappingURL=UrlDetector.js.map