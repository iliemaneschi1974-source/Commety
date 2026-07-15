import { ReputationContext } from "../ReputationContext";
import { ReputationEvidenceType } from "../ReputationEvidence";
import { ReputationRule } from "../rules/ReputationRule";
/**
 * Verifica che una ReputationRule produca
 * una singola evidenza del tipo atteso.
 *
 * Utility utilizzata esclusivamente
 * all'interno della suite di test.
 */
export declare function assertRuleProducesEvidence(rule: ReputationRule, context: ReputationContext, expectedEvidence: ReputationEvidenceType): void;
//# sourceMappingURL=assertRuleProducesEvidence.d.ts.map