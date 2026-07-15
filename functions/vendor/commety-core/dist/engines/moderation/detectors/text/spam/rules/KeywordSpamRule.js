"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordSpamRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di parole o espressioni
 * comunemente associate a contenuti spam.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class KeywordSpamRule {
    /**
     * Parole chiave ed espressioni tipicamente
     * utilizzate nei contenuti spam.
     */
    static KEYWORDS = [
        "bitcoin",
        "crypto",
        "forex",
        "casino",
        "scommesse",
        "trading",
        "investimento garantito",
        "guadagno facile",
        "referral",
        "multilevel",
    ];
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo.toLowerCase();
        let paroleTrovate = 0;
        for (const keyword of KeywordSpamRule.KEYWORDS) {
            if (testo.includes(keyword)) {
                paroleTrovate++;
            }
        }
        if (paroleTrovate === 0) {
            return [];
        }
        const confidenza = paroleTrovate >= 3
            ? 1.0
            : paroleTrovate === 2
                ? 0.85
                : 0.70;
        return [
            new ModerationEvidence_1.ModerationEvidence("PAROLE_CHIAVE_SPAM", "Rilevate parole chiave tipicamente associate a contenuti spam.", confidenza, "TESTO"),
        ];
    }
}
exports.KeywordSpamRule = KeywordSpamRule;
//# sourceMappingURL=KeywordSpamRule.js.map