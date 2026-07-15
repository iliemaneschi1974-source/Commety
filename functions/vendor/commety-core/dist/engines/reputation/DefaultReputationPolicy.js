"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultReputationPolicy = void 0;
const ReputationDecision_1 = require("./ReputationDecision");
/**
 * Politica di reputazione predefinita.
 *
 * Interpreta le evidenze disponibili e determina
 * il livello di fiducia dell'utente.
 */
class DefaultReputationPolicy {
    static EVIDENZE_NEGATIVE = [
        "SPAM_RECIDIVO",
        "ABUSO_RECIDIVO",
        "VIOLAZIONI_RIPETUTE",
        "CONTENUTI_RIMOSSI_FREQUENTEMENTE",
        "FIDUCIA_IN_DIMINUZIONE",
    ];
    static EVIDENZE_POSITIVE = [
        "STORICO_AFFIDABILE",
        "SEGNALAZIONI_PRECISE",
        "SEGNALAZIONI_ATTENDIBILI",
        "CONFERME_FREQUENTI",
        "COLLABORAZIONE_COSTANTE",
        "VALIDATORE_AFFIDABILE",
        "CONTENUTI_DI_QUALITA",
        "FOTO_DI_QUALITA",
        "DESCRIZIONI_COMPLETE",
    ];
    valuta(evidenze) {
        const tipi = new Set(evidenze.map((e) => e.tipo));
        if (DefaultReputationPolicy.EVIDENZE_NEGATIVE.some((tipo) => tipi.has(tipo))) {
            return ReputationDecision_1.ReputationDecision.nonAffidabile();
        }
        const tuttePositive = evidenze.length > 0 &&
            evidenze.every((e) => DefaultReputationPolicy.EVIDENZE_POSITIVE.includes(e.tipo));
        if (tuttePositive) {
            return ReputationDecision_1.ReputationDecision.altaFiducia();
        }
        return ReputationDecision_1.ReputationDecision.fiduciaStandard();
    }
}
exports.DefaultReputationPolicy = DefaultReputationPolicy;
//# sourceMappingURL=DefaultReputationPolicy.js.map