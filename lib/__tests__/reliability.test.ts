import { describe, expect, it } from "vitest";

import { getReliabilityProfile } from "../reliability";

describe("getReliabilityProfile", () => {
  it("assegna i badge alle rispettive soglie", () => {
    expect(getReliabilityProfile(0).label).toBe("Nuovo membro");
    expect(getReliabilityProfile(15).label).toBe("Affidabile");
    expect(getReliabilityProfile(40).label).toBe("Reporter verificato");
    expect(getReliabilityProfile(70).label).toBe("Sentinella locale");
  });

  it("mantiene il punteggio entro i limiti previsti", () => {
    expect(getReliabilityProfile(-10).score).toBe(0);
    expect(getReliabilityProfile(120).score).toBe(100);
  });
});
