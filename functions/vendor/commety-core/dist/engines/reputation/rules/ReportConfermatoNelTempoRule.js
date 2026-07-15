"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportConfermatoNelTempoRule = void 0;
const ReputationEvidence_1 = require("../ReputationEvidence");
/**
 * Rileva la presenza di almeno una segnalazione
 * confermata nel tempo.
 *
 * Una segnalazione confermata rappresenta un forte
 * indicatore di affidabilità dell'utente e contribuisce
 * alla costruzione del suo profilo di fiducia.
 */
class ReportConfermatoNelTempoRule {
    analizza(contesto) {
        if (!contesto.haSegnale("REPORT_CONFERMATO_NEL_TEMPO")) {
            return [];
        }
        return [
            new ReputationEvidence_1.ReputationEvidence("STORICO_AFFIDABILE", "L'utente possiede almeno una segnalazione confermata nel tempo.", 1, "LIFECYCLE"),
        ];
    }
}
exports.ReportConfermatoNelTempoRule = ReportConfermatoNelTempoRule;
//# sourceMappingURL=ReportConfermatoNelTempoRule.js.map