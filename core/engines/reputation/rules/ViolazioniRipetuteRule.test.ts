import { describe, expect, it } from "vitest";

import { ViolazioniRipetuteRule } from "./ViolazioniRipetuteRule";
import { ReputationContextBuilder } from "../testing/ReputationContextBuilder";
import { assertRuleProducesEvidence } from "../testing/assertRuleProducesEvidence";

describe("ViolazioniRipetuteRule", () => {
  const rule = new ViolazioniRipetuteRule();

  it("non produce evidenze quando le violazioni sono inferiori alla soglia", () => {
    const context = ReputationContextBuilder.create()
      .conContenutoLimitato()
      .conContenutoRimosso()
      .build();

    const evidenze = rule.analizza(context);

    expect(evidenze).toHaveLength(0);
  });

  it("produce VIOLAZIONI_RIPETUTE quando le violazioni raggiungono la soglia", () => {
    const context = ReputationContextBuilder.create()
      .conContenutoLimitato()
      .conContenutoLimitato()
      .conContenutoRimosso()
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "VIOLAZIONI_RIPETUTE"
    );
  });

  it("produce VIOLAZIONI_RIPETUTE sommando contenuti limitati e rimossi", () => {
    const context = ReputationContextBuilder.create()
      .conContenutoLimitato()
      .conContenutoRimosso()
      .conContenutoRimosso()
      .build();

    assertRuleProducesEvidence(
      rule,
      context,
      "VIOLAZIONI_RIPETUTE"
    );
  });
});