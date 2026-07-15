import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";
/**
 * Rileva la presenza di almeno un report
 * successivamente smentito.
 *
 * Un report smentito rappresenta un indicatore
 * negativo per la costruzione della fiducia
 * dell'utente.
 */
export declare class ReportSmentitoRule implements ReputationRule {
    analizza(contesto: ReputationContext): readonly ReputationEvidence[];
}
//# sourceMappingURL=ReportSmentitoRule.d.ts.map