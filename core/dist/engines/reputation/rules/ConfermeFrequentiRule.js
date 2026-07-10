"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfermeFrequentiRule = void 0;
const ReputationEvidence_1 = require("../ReputationEvidence");
/**
 * Rileva la presenza di numerose conferme
 * della community sui contenuti dell'utente.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di reputazione.
 */
class ConfermeFrequentiRule {
    /**
     * Numero minimo di conferme richieste
     * per considerare il fenomeno significativo.
     */
    static SOGLIA_CONFERME = 10;
    analizza(contesto) {
        if (contesto.contaSegnali("CONFERMA_COMMUNITY") <
            ConfermeFrequentiRule.SOGLIA_CONFERME) {
            return [];
        }
        return [
            new ReputationEvidence_1.ReputationEvidence("CONFERME_FREQUENTI", "L'utente riceve frequentemente conferme dalla community.", 1, "COMMUNITY"),
        ];
    }
}
exports.ConfermeFrequentiRule = ConfermeFrequentiRule;
//# sourceMappingURL=ConfermeFrequentiRule.js.map