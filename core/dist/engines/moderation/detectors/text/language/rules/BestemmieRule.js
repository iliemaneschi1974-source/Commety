"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestemmieRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di bestemmie
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class BestemmieRule {
    /**
     * Elenco iniziale delle bestemmie.
     *
     * L'elenco è volutamente ridotto e potrà
     * essere ampliato nel tempo.
     */
    static BESTEMMIE = [
        "porco dio",
        "porca madonna",
        "dio cane",
        "dio porco",
        "cristo cane",
    ];
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo.toLowerCase();
        let rilevate = 0;
        for (const bestemmia of BestemmieRule.BESTEMMIE) {
            const regex = new RegExp(`\\b${bestemmia}\\b`, "iu");
            if (regex.test(testo)) {
                rilevate++;
            }
        }
        if (rilevate === 0) {
            return [];
        }
        const confidenza = rilevate >= 3
            ? 1.0
            : rilevate === 2
                ? 0.85
                : 0.70;
        return [
            new ModerationEvidence_1.ModerationEvidence("BESTEMMIE", "Rilevato linguaggio blasfemo nel contenuto.", confidenza, "TESTO"),
        ];
    }
}
exports.BestemmieRule = BestemmieRule;
//# sourceMappingURL=BestemmieRule.js.map