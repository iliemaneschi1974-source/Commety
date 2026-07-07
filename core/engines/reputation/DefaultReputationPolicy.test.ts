import { describe, expect, it } from "vitest";

import { DefaultReputationPolicy } from "./DefaultReputationPolicy";
import { ReputationEvidence } from "./ReputationEvidence";

describe("DefaultReputationPolicy", () => {
  const policy = new DefaultReputationPolicy();

  it("assegna una fiducia standard quando non sono presenti evidenze", () => {
    const decision = policy.valuta([]);

    expect(decision.isFiduciaStandard()).toBe(true);
  });

  it("assegna alta fiducia quando tutte le evidenze sono positive", () => {
    const decision = policy.valuta([
      new ReputationEvidence(
        "STORICO_AFFIDABILE",
        "",
        1,
        "LIFECYCLE"
      ),
      new ReputationEvidence(
        "SEGNALAZIONI_PRECISE",
        "",
        1,
        "PUBLICATION"
      ),
    ]);

    expect(decision.isAltaFiducia()).toBe(true);
  });

  it("assegna non affidabile quando è presente una evidenza negativa", () => {
    const decision = policy.valuta([
      new ReputationEvidence(
        "SPAM_RECIDIVO",
        "",
        1,
        "MODERATION"
      ),
    ]);

    expect(decision.isNonAffidabile()).toBe(true);
  });

  it("assegna non affidabile quando sono presenti evidenze positive e negative", () => {
    const decision = policy.valuta([
      new ReputationEvidence(
        "STORICO_AFFIDABILE",
        "",
        1,
        "LIFECYCLE"
      ),
      new ReputationEvidence(
        "SPAM_RECIDIVO",
        "",
        1,
        "MODERATION"
      ),
    ]);

    expect(decision.isNonAffidabile()).toBe(true);
  });
});