"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegnalazioniPreciseRule = void 0;
const ReputationEvidence_1 = require("../ReputationEvidence");
/**
 * Rileva la presenza di almeno una segnalazione
 * valutata come precisa.
 *
 * Una segnalazione precisa rappresenta un indicatore
 * positivo dell'accuratezza dell'utente e contribuisce
 * alla costruzione della sua reputazione.
 */
class SegnalazioniPreciseRule {
    analizza(contesto) {
        if (!contesto.haSegnale("SEGNALAZIONE_PRECISA")) {
            return [];
        }
        return [
            new ReputationEvidence_1.ReputationEvidence("SEGNALAZIONI_PRECISE", "L'utente ha prodotto almeno una segnalazione valutata come precisa.", 1, "PUBLICATION"),
        ];
    }
}
exports.SegnalazioniPreciseRule = SegnalazioniPreciseRule;
//# sourceMappingURL=SegnalazioniPreciseRule.js.map