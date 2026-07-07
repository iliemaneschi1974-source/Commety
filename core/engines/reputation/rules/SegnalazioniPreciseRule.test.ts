import { describe, expect, it } from "vitest";

import { SegnalazioniPreciseRule } from "./SegnalazioniPreciseRule";
import { ReputationContextBuilder } from "../testing/ReputationContextBuilder";
import { assertRuleProducesEvidence } from "../testing/assertRuleProducesEvidence";

describe("SegnalazioniPreciseRule", () => {
  const rule = new SegnalazioniPreciseRule();

  it("non produce evidenze quando non sono presenti segnalazioni precise", () => {
    const context = ReputationContextBuilder.create().build();

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(0);
  });

  it("produce SEGNALAZIONI_PRECISE quando è presente una segnalazione precisa", () => {
    const context = ReputationContextBuilder.create()
      .conSegnalazionePrecisa()
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "SEGNALAZIONI_PRECISE"
    );
  });
});