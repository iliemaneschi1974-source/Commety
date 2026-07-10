import { CompositeReputationAnalyzer } from "./CompositeReputationAnalyzer";
import { ReputationEngine } from "./ReputationEngine";
import { ReputationPolicy } from "./ReputationPolicy";
import { ReputationProfile } from "./ReputationProfile";
import { ReputationSignal } from "./ReputationSignal";
/**
 * Implementazione predefinita del Reputation Engine.
 *
 * Coordina l'intero processo di valutazione della reputazione
 * senza contenere logica decisionale.
 */
export declare class DefaultReputationEngine implements ReputationEngine {
    private readonly analyzer;
    private readonly policy;
    constructor(analyzer: CompositeReputationAnalyzer, policy: ReputationPolicy);
    valuta(segnali: readonly ReputationSignal[]): ReputationProfile;
}
//# sourceMappingURL=DefaultReputationEngine.d.ts.map