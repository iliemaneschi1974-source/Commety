import { describe, expect, it } from "vitest";

import { CompositeReputationAnalyzer } from "./CompositeReputationAnalyzer";
import { DefaultReputationEngine } from "./DefaultReputationEngine";
import { DefaultReputationPolicy } from "./DefaultReputationPolicy";
import { ReputationContextBuilder } from "./testing/ReputationContextBuilder";
import { ReportConfermatoNelTempoRule } from "./rules/ReportConfermatoNelTempoRule";
import { SpamRecidivoRule } from "./rules/SpamRecidivoRule";

describe("DefaultReputationEngine", () => {
  const engine = new DefaultReputationEngine(
    new CompositeReputationAnalyzer([
      new ReportConfermatoNelTempoRule(),
      new SpamRecidivoRule(),
    ]),
    new DefaultReputationPolicy()
  );

  it("assegna una fiducia standard quando non sono presenti segnali", () => {
    const profile = engine.valuta(
      ReputationContextBuilder.create().build().segnali
    );

    expect(
      profile.decision.isFiduciaStandard()
    ).toBe(true);
  });

  it("assegna alta fiducia quando sono presenti solo segnali positivi", () => {
    const profile = engine.valuta(
      ReputationContextBuilder.create()
        .conReportConfermatoNelTempo()
        .build().segnali
    );

    expect(
      profile.decision.isAltaFiducia()
    ).toBe(true);
  });

  it("assegna un profilo non affidabile quando è presente uno spam", () => {
    const profile = engine.valuta(
      ReputationContextBuilder.create()
        .conSpam()
        .build().segnali
    );

    expect(
      profile.decision.isNonAffidabile()
    ).toBe(true);
  });
});