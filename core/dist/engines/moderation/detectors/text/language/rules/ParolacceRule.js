"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParolacceRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva la presenza di termini volgari
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
class ParolacceRule {
    /**
     * Elenco iniziale dei termini volgari.
     */
    static PAROLACCE = [
        "cazzo",
        "merda",
        "vaffanculo",
        "stronzo",
        "coglione",
    ];
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo.toLowerCase();
        let rilevate = 0;
        for (const parola of ParolacceRule.PAROLACCE) {
            const regex = new RegExp(`\\b${parola}\\b`, "iu");
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
            new ModerationEvidence_1.ModerationEvidence("PAROLACCE", "Rilevato linguaggio volgare nel contenuto.", confidenza, "TESTO"),
        ];
    }
}
exports.ParolacceRule = ParolacceRule;
//# sourceMappingURL=ParolacceRule.js.map