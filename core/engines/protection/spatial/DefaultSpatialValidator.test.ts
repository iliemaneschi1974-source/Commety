import { describe, expect, it } from "vitest";

import { GeoPoint } from "../../../domain/GeoPoint";
import { DefaultSpatialValidator } from "./DefaultSpatialValidator";
import { DistanceCalculator } from "./DistanceCalculator";
import { SpatialPolicy } from "./SpatialPolicy";
import { SpatialCandidate } from "./SpatialValidator";

class FakeSpatialPolicy implements SpatialPolicy {
  constructor(
    private readonly influenceRadius: number,
  ) {}

  getInfluenceRadius(): number {
    return this.influenceRadius;
  }
}

class FakeDistanceCalculator implements DistanceCalculator {
  constructor(
    private readonly distance: number,
  ) {}

  calculate(
    _from: GeoPoint,
    _to: GeoPoint,
  ): number {
    return this.distance;
  }
}

function candidate(
  overrides: Partial<SpatialCandidate> = {},
): SpatialCandidate {
  return {
    category: "traffico",
    latitude: 41.9028,
    longitude: 12.4964,
    ...overrides,
  };
}

const reference: GeoPoint = {
  latitude: 41.9030,
  longitude: 12.4968,
};

describe("DefaultSpatialValidator", () => {
  it("considera valida una segnalazione entro il raggio di influenza", () => {
    const validator = new DefaultSpatialValidator(
      new FakeSpatialPolicy(300),
      new FakeDistanceCalculator(120),
    );

    const result = validator.analyze(
      candidate(),
      reference,
    );

    expect(result.isValid).toBe(true);
    expect(result.confidence).toBe(1);
  });

  it("considera non valida una segnalazione oltre il raggio di influenza", () => {
    const validator = new DefaultSpatialValidator(
      new FakeSpatialPolicy(300),
      new FakeDistanceCalculator(450),
    );

    const result = validator.analyze(
      candidate(),
      reference,
    );

    expect(result.isValid).toBe(false);
    expect(result.confidence).toBe(0);
  });

  it("considera valida una segnalazione esattamente al limite del raggio", () => {
    const validator = new DefaultSpatialValidator(
      new FakeSpatialPolicy(300),
      new FakeDistanceCalculator(300),
    );

    const result = validator.analyze(
      candidate(),
      reference,
    );

    expect(result.isValid).toBe(true);
  });

  it("restituisce sempre una motivazione", () => {
    const validator = new DefaultSpatialValidator(
      new FakeSpatialPolicy(300),
      new FakeDistanceCalculator(150),
    );

    const result = validator.analyze(
      candidate(),
      reference,
    );

    expect(result.reason.length).toBeGreaterThan(0);
  });
});