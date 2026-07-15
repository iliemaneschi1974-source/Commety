"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlPresenceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di uno o più URL
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class UrlPresenceRule {
    /**
     * Espressione regolare utilizzata per
     * individuare URL nel testo.
     */
    static URL_REGEX = /\b(?:https?:\/\/|www\.)\S+\b/iu;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        if (!UrlPresenceRule.URL_REGEX.test(testo)) {
            return [];
        }
        return [
            new ModerationEvidence_1.ModerationEvidence("LINK_MULTIPLI", "Rilevata la presenza di uno o più URL nel contenuto.", 1.0, "TESTO"),
        ];
    }
}
exports.UrlPresenceRule = UrlPresenceRule;
//# sourceMappingURL=UrlPresenceRule.js.map