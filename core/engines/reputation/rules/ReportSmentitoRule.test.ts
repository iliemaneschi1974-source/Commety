import { describe, expect, it } from "vitest";

import { ReportSmentitoRule } from "./ReportSmentitoRule";
import { ReputationContextBuilder } from "../testing/ReputationContextBuilder";
import { assertRuleProducesEvidence } from "../testing/assertRuleProducesEvidence";

describe("ReportSmentitoRule", () => {
  const rule = new ReportSmentitoRule();

  it("non produce evidenze quando non sono presenti report smentiti", () => {
    const context = ReputationContextBuilder.create().build();

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(0);
  });

  it("produce FIDUCIA_IN_DIMINUZIONE quando è presente un report smentito", () => {
    const context = ReputationContextBuilder.create()
      .conReportSmentito()
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "FIDUCIA_IN_DIMINUZIONE"
    );
  });
});