import { describe, expect, it } from "vitest";

import { SpamRecidivoRule } from "./SpamRecidivoRule";
import { ReputationContextBuilder } from "../testing/ReputationContextBuilder";
import { assertRuleProducesEvidence } from "../testing/assertRuleProducesEvidence";

describe("SpamRecidivoRule", () => {
  const rule = new SpamRecidivoRule();

  it("non produce evidenze quando non sono presenti segnalazioni di spam", () => {
    const context = ReputationContextBuilder.create().build();

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(0);
  });

  it("produce SPAM_RECIDIVO quando è presente una segnalazione di spam", () => {
    const context = ReputationContextBuilder.create()
      .conSpam()
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "SPAM_RECIDIVO"
    );
  });
});