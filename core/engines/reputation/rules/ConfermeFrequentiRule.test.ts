import { describe, expect, it } from "vitest";

import { ConfermeFrequentiRule } from "./ConfermeFrequentiRule";
import { ReputationContextBuilder } from "../testing/ReputationContextBuilder";
import { assertRuleProducesEvidence } from "../testing/assertRuleProducesEvidence";

describe("ConfermeFrequentiRule", () => {
  const rule = new ConfermeFrequentiRule();

  it("non produce evidenze quando le conferme sono inferiori alla soglia", () => {
    const context = ReputationContextBuilder.create()
      .conConfermaCommunity(9)
      .build();

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(0);
  });

  it("produce CONFERME_FREQUENTI quando le conferme raggiungono la soglia", () => {
    const context = ReputationContextBuilder.create()
      .conConfermaCommunity(10)
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "CONFERME_FREQUENTI"
    );
  });

  it("produce CONFERME_FREQUENTI quando le conferme superano la soglia", () => {
    const context = ReputationContextBuilder.create()
      .conConfermaCommunity(15)
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "CONFERME_FREQUENTI"
    );
  });
});