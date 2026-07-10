"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSmentitoRule = void 0;
const ReputationEvidence_1 = require("../ReputationEvidence");
/**
 * Rileva la presenza di almeno un report
 * successivamente smentito.
 *
 * Un report smentito rappresenta un indicatore
 * negativo per la costruzione della fiducia
 * dell'utente.
 */
class ReportSmentitoRule {
    analizza(contesto) {
        if (!contesto.haSegnale("REPORT_SMENTITO")) {
            return [];
        }
        return [
            new ReputationEvidence_1.ReputationEvidence("FIDUCIA_IN_DIMINUZIONE", "L'utente possiede almeno un report successivamente smentito.", 1, "PUBLICATION"),
        ];
    }
}
exports.ReportSmentitoRule = ReportSmentitoRule;
//# sourceMappingURL=ReportSmentitoRule.js.map