import { describe, expect, it } from "vitest";

import { CompositeReputationAnalyzer } from "./CompositeReputationAnalyzer";
import { ReputationContextBuilder } from "./testing/ReputationContextBuilder";
import { ReportConfermatoNelTempoRule } from "./rules/ReportConfermatoNelTempoRule";
import { SpamRecidivoRule } from "./rules/SpamRecidivoRule";

describe("CompositeReputationAnalyzer", () => {
  it("non produce evidenze quando nessuna regola rileva fenomeni", () => {
    const analyzer = new CompositeReputationAnalyzer([
      new ReportConfermatoNelTempoRule(),
      new SpamRecidivoRule(),
    ]);

    const evidenze = analyzer.analizza(
      ReputationContextBuilder.create().build()
    );

    expect(evidenze).toHaveLength(0);
  });

  it("raccoglie le evidenze prodotte da tutte le regole", () => {
    const analyzer = new CompositeReputationAnalyzer([
      new ReportConfermatoNelTempoRule(),
      new SpamRecidivoRule(),
    ]);

    const evidenze = analyzer.analizza(
      ReputationContextBuilder.create()
        .conReportConfermatoNelTempo()
        .conSpam()
        .build()
    );

    expect(evidenze).toHaveLength(2);

    expect(evidenze.map((e) => e.tipo)).toEqual([
      "STORICO_AFFIDABILE",
      "SPAM_RECIDIVO",
    ]);
  });
});