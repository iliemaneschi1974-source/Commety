import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";
/**
 * Rileva la presenza di almeno una segnalazione
 * valutata come precisa.
 *
 * Una segnalazione precisa rappresenta un indicatore
 * positivo dell'accuratezza dell'utente e contribuisce
 * alla costruzione della sua reputazione.
 */
export declare class SegnalazioniPreciseRule implements ReputationRule {
    analizza(contesto: ReputationContext): readonly ReputationEvidence[];
}
//# sourceMappingURL=SegnalazioniPreciseRule.d.ts.map