"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpamRecidivoRule = void 0;
const ReputationEvidence_1 = require("../ReputationEvidence");
/**
 * Rileva la presenza di almeno una violazione
 * di spam osservata dal Reputation Engine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di reputazione.
 */
class SpamRecidivoRule {
    analizza(contesto) {
        if (!contesto.haSegnale("SEGNALAZIONE_SPAM")) {
            return [];
        }
        return [
            new ReputationEvidence_1.ReputationEvidence("SPAM_RECIDIVO", "L'utente ha ricevuto almeno una segnalazione di spam.", 1, "MODERATION"),
        ];
    }
}
exports.SpamRecidivoRule = SpamRecidivoRule;
//# sourceMappingURL=SpamRecidivoRule.js.map