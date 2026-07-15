"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UppercaseRule = void 0;
const ModerationEvidence_1 = require("../../../../ModerationEvidence");
/**
 * Rileva un utilizzo eccessivo di lettere maiuscole
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
class UppercaseRule {
    /**
     * Percentuale minima di lettere maiuscole
     * necessaria per produrre un'evidenza.
     */
    static PERCENTUALE_MINIMA = 0.8;
    analizza(contenuto) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        const testo = contenuto.testo;
        let lettere = 0;
        let maiuscole = 0;
        for (const carattere of testo) {
            if (/[A-Za-zÀ-ÖØ-Þà-öø-ÿ]/u.test(carattere)) {
                lettere++;
                if (carattere === carattere.toUpperCase()) {
                    maiuscole++;
                }
            }
        }
        if (lettere === 0) {
            return [];
        }
        const percentuale = maiuscole / lettere;
        if (percentuale >= UppercaseRule.PERCENTUALE_MINIMA) {
            return [
                new ModerationEvidence_1.ModerationEvidence("MAIUSCOLO_ECCESSIVO", "Rilevato un utilizzo eccessivo di lettere maiuscole.", percentuale, "TESTO"),
            ];
        }
        return [];
    }
}
exports.UppercaseRule = UppercaseRule;
//# sourceMappingURL=UppercaseRule.js.map