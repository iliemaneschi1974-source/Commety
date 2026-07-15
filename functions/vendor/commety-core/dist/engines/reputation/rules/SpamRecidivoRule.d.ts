import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";
/**
 * Rileva la presenza di almeno una violazione
 * di spam osservata dal Reputation Engine.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di reputazione.
 */
export declare class SpamRecidivoRule implements ReputationRule {
    analizza(contesto: ReputationContext): readonly ReputationEvidence[];
}
//# sourceMappingURL=SpamRecidivoRule.d.ts.map