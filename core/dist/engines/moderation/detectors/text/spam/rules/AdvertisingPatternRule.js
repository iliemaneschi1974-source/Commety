"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvertisingPatternRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di espressioni tipicamente
 * utilizzate in contenuti pubblicitari o promozionali.
 *
 * La regola osserva esclusivamente il linguaggio
 * utilizzato e non prende decisioni sul contenuto.
 */
class AdvertisingPatternRule {
    /**
     * Pattern linguistici comunemente presenti
     * nei contenuti promozionali.
     */
    static PATTERN = [
        "clicca qui",
        "offerta imperdibile",
        "offerta limitata",
        "guadagna subito",
        "guadagno garantito",
        "solo oggi",
        "scrivimi in privato",
        "contattami in privato",
        "link in bio",
        "entra nel gruppo",
        "iscriviti ora",
        "telegram",
        "whatsapp",
        "promo",
        "promozione",
    ];
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo.toLowerCase();
        let patternTrovati = 0;
        for (const pattern of AdvertisingPatternRule.PATTERN) {
            if (testo.includes(pattern)) {
                patternTrovati++;
            }
        }
        if (patternTrovati === 0) {
            return [];
        }
        const confidenza = patternTrovati >= 3
            ? 1.0
            : 0.8 + ((patternTrovati - 1) * 0.1);
        return [
            new ModerationEvidence_1.ModerationEvidence("PUBBLICITA", "Rilevati pattern tipici di contenuto promozionale.", confidenza, "TESTO"),
        ];
    }
}
exports.AdvertisingPatternRule = AdvertisingPatternRule;
//# sourceMappingURL=AdvertisingPatternRule.js.map