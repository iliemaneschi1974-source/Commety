"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViolazioniRipetuteRule = void 0;
const ReputationEvidence_1 = require("../ReputationEvidence");
/**
 * Rileva la presenza di violazioni di moderazione
 * ripetute nel tempo.
 *
 * La regola osserva esclusivamente i contenuti
 * limitati o rimossi e produce una singola
 * evidenza di reputazione.
 */
class ViolazioniRipetuteRule {
    /**
     * Numero minimo di violazioni richieste
     * per considerare il comportamento
     * ripetuto.
     */
    static SOGLIA_VIOLAZIONI = 3;
    analizza(contesto) {
        const violazioni = contesto.contaSegnali("CONTENUTO_LIMITATO") +
            contesto.contaSegnali("CONTENUTO_RIMOSSO");
        if (violazioni <
            ViolazioniRipetuteRule.SOGLIA_VIOLAZIONI) {
            return [];
        }
        return [
            new ReputationEvidence_1.ReputationEvidence("VIOLAZIONI_RIPETUTE", "L'utente ha accumulato ripetute violazioni di moderazione.", 1, "MODERATION"),
        ];
    }
}
exports.ViolazioniRipetuteRule = ViolazioniRipetuteRule;
//# sourceMappingURL=ViolazioniRipetuteRule.js.map