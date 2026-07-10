import { ReputationContext } from "../ReputationContext";
import { ReputationEvidence } from "../ReputationEvidence";
import { ReputationRule } from "./ReputationRule";
/**
 * Rileva la presenza di violazioni di moderazione
 * ripetute nel tempo.
 *
 * La regola osserva esclusivamente i contenuti
 * limitati o rimossi e produce una singola
 * evidenza di reputazione.
 */
export declare class ViolazioniRipetuteRule implements ReputationRule {
    /**
     * Numero minimo di violazioni richieste
     * per considerare il comportamento
     * ripetuto.
     */
    private static readonly SOGLIA_VIOLAZIONI;
    analizza(contesto: ReputationContext): readonly ReputationEvidence[];
}
//# sourceMappingURL=ViolazioniRipetuteRule.d.ts.map