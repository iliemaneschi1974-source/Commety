import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";
/**
 * Rileva la presenza di numerose conferme
 * della community sui contenuti dell'utente.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di reputazione.
 */
export declare class ConfermeFrequentiRule implements ReputationRule {
    /**
     * Numero minimo di conferme richieste
     * per considerare il fenomeno significativo.
     */
    private static readonly SOGLIA_CONFERME;
    analizza(contesto: ReputationContext): readonly ReputationEvidence[];
}
//# sourceMappingURL=ConfermeFrequentiRule.d.ts.map