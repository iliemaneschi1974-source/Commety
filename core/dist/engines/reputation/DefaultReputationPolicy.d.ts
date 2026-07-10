import { ReputationDecision } from "./ReputationDecision";
import { ReputationEvidence } from "./ReputationEvidence";
import { ReputationPolicy } from "./ReputationPolicy";
/**
 * Politica di reputazione predefinita.
 *
 * Interpreta le evidenze disponibili e determina
 * il livello di fiducia dell'utente.
 */
export declare class DefaultReputationPolicy implements ReputationPolicy {
    private static readonly EVIDENZE_NEGATIVE;
    private static readonly EVIDENZE_POSITIVE;
    valuta(evidenze: readonly ReputationEvidence[]): ReputationDecision;
}
//# sourceMappingURL=DefaultReputationPolicy.d.ts.map