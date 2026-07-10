import { ReputationDecision } from "./ReputationDecision";
import { ReputationEvidence } from "./ReputationEvidence";
/**
 * Rappresenta il profilo di fiducia corrente
 * associato a un utente.
 *
 * Il profilo è una rappresentazione del risultato
 * dell'analisi svolta dal Reputation Engine.
 * Non contiene logiche di calcolo.
 */
export declare class ReputationProfile {
    /**
     * Decisione corrente del Reputation Engine.
     */
    readonly decision: ReputationDecision;
    /**
     * Evidenze che giustificano la decisione.
     */
    readonly evidenze: readonly ReputationEvidence[];
    /**
     * Momento dell'ultima valutazione.
     */
    readonly aggiornatoIl: Date;
    constructor(
    /**
     * Decisione corrente del Reputation Engine.
     */
    decision: ReputationDecision, 
    /**
     * Evidenze che giustificano la decisione.
     */
    evidenze: readonly ReputationEvidence[], 
    /**
     * Momento dell'ultima valutazione.
     */
    aggiornatoIl: Date);
    equals(other: ReputationProfile): boolean;
}
//# sourceMappingURL=ReputationProfile.d.ts.map