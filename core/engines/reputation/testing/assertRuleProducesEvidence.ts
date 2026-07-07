import { expect } from "vitest";

import { ReputationContext } from "../ReputationContext";
import {
  ReputationEvidenceType,
} from "../ReputationEvidence";
import { ReputationRule } from "../rules/ReputationRule";

/**
 * Verifica che una ReputationRule produca
 * una singola evidenza del tipo atteso.
 *
 * Utility utilizzata esclusivamente
 * all'interno della suite di test.
 */
export function assertRuleProducesEvidence(
  rule: ReputationRule,
  context: ReputationContext,
  expectedEvidence: ReputationEvidenceType
): void {
  const evidenze = rule.analizza(context);

  expect(evidenze).toHaveLength(1);
  expect(evidenze[0].tipo).toBe(expectedEvidence);
}