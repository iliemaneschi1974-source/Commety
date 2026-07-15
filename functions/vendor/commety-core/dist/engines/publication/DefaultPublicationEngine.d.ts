import { PublicationEngine } from "./PublicationEngine";
import { PublicationEvidence } from "./PublicationEvidence";
import { PublicationDecision } from "./PublicationDecision";
import { PublicationPolicy } from "./PublicationPolicy";
/**
 * Implementazione predefinita del motore
 * di decisione della pubblicazione.
 */
export declare class DefaultPublicationEngine implements PublicationEngine {
    private readonly policy;
    constructor(policy: PublicationPolicy);
    decide(evidence: PublicationEvidence): PublicationDecision;
}
//# sourceMappingURL=DefaultPublicationEngine.d.ts.map