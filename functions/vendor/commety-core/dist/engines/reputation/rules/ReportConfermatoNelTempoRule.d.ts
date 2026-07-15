import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";
/**
 * Rileva la presenza di almeno una segnalazione
 * confermata nel tempo.
 *
 * Una segnalazione confermata rappresenta un forte
 * indicatore di affidabilità dell'utente e contribuisce
 * alla costruzione del suo profilo di fiducia.
 */
export declare class ReportConfermatoNelTempoRule implements ReputationRule {
    analizza(contesto: ReputationContext): readonly ReputationEvidence[];
}
//# sourceMappingURL=ReportConfermatoNelTempoRule.d.ts.map