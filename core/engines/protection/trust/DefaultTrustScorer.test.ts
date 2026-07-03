import { describe, expect, it } from "vitest";

import { DefaultTrustPolicy } from "./DefaultTrustPolicy";
import { DefaultTrustScorer } from "./DefaultTrustScorer";
import { TrustEvidence } from "./TrustEvidence";

const scorer = new DefaultTrustScorer(
  new DefaultTrustPolicy(),
);

function evidence(
  overrides: Partial<TrustEvidence> = {},
): TrustEvidence {
  return {
    duplicate: {
      isDuplicate: false,
      confidence: 1,
      reason: "",
    },
    temporal: {
      isValid: true,
      confidence: 1,
      reason: "",
    },
    spatial: {
      isValid: true,
      confidence: 1,
      reason: "",
    },
    ...overrides,
  };
}

describe("DefaultTrustScorer", () => {
  it("assegna il punteggio massimo quando tutte le evidenze sono positive", () => {
    const result = scorer.score(
      evidence(),
    );

    expect(result.value).toBe(1);
    expect(result.confidence).toBe(1);
  });

  it("riduce il punteggio quando il report è un duplicato", () => {
    const result = scorer.score(
      evidence({
        duplicate: {
          isDuplicate: true,
          confidence: 1,
          reason: "",
        },
      }),
    );

    expect(result.value).toBe(0.5);
  });

  it("riduce il punteggio quando la validità temporale fallisce", () => {
    const result = scorer.score(
      evidence({
        temporal: {
          isValid: false,
          confidence: 1,
          reason: "",
        },
      }),
    );

    expect(result.value).toBe(0.75);
  });

  it("riduce il punteggio quando la validità spaziale fallisce", () => {
    const result = scorer.score(
      evidence({
        spatial: {
          isValid: false,
          confidence: 1,
          reason: "",
        },
      }),
    );

    expect(result.value).toBe(0.75);
  });

  it("restituisce sempre una motivazione", () => {
    const result = scorer.score(
      evidence(),
    );

    expect(result.reason.length).toBeGreaterThan(0);
  });
});