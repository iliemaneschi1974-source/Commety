import { TrustPolicy } from "./TrustPolicy";
import { TrustScorer } from "./TrustScorer";
import { TrustEvidence } from "./TrustEvidence";
import { TrustScore } from "./TrustScore";
/**
 * Implementazione predefinita del motore di valutazione
 * dell'affidabilità di una segnalazione.
 */
export declare class DefaultTrustScorer implements TrustScorer {
    private readonly policy;
    constructor(policy: TrustPolicy);
    score(evidence: TrustEvidence): TrustScore;
    private buildReason;
}
//# sourceMappingURL=DefaultTrustScorer.d.ts.map