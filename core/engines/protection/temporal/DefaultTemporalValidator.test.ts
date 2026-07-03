import { describe, expect, it } from "vitest";

import { ReportCategory } from "../../../domain/ReportCategory";
import { DefaultTemporalValidator } from "./DefaultTemporalValidator";
import { TemporalCandidate } from "./TemporalValidator";
import { TemporalPolicy } from "./TemporalPolicy";

class FakeTemporalPolicy implements TemporalPolicy {
  getValidityDuration(): number {
    return 60 * 60 * 1000; // 1 ora
  }
}

const validator = new DefaultTemporalValidator(
  new FakeTemporalPolicy(),
);

function candidate(
  overrides: Partial<TemporalCandidate> = {},
): TemporalCandidate {
  return {
    category: "traffico" as ReportCategory,
    occurredAt: new Date("2026-07-03T10:00:00Z"),
    ...overrides,
  };
}

describe("DefaultTemporalValidator", () => {
  it("considera valida una segnalazione entro la durata prevista", () => {
    const result = validator.analyze(
      candidate(),
      new Date("2026-07-03T10:30:00Z"),
    );

    expect(result.isValid).toBe(true);
    expect(result.confidence).toBe(1);
  });

  it("considera non valida una segnalazione oltre la durata prevista", () => {
    const result = validator.analyze(
      candidate(),
      new Date("2026-07-03T11:30:01Z"),
    );

    expect(result.isValid).toBe(false);
    expect(result.confidence).toBe(0);
  });

  it("considera valida una segnalazione esattamente al limite", () => {
    const result = validator.analyze(
      candidate(),
      new Date("2026-07-03T11:00:00Z"),
    );

    expect(result.isValid).toBe(true);
  });

  it("restituisce sempre una motivazione", () => {
    const result = validator.analyze(
      candidate(),
      new Date("2026-07-03T10:15:00Z"),
    );

    expect(result.reason.length).toBeGreaterThan(0);
  });
});