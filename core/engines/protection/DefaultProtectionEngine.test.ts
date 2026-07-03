import { describe, expect, it } from "vitest";

import { DefaultProtectionEngine } from "./DefaultProtectionEngine";

import type { Observation } from "../../domain/Observation";

describe("DefaultProtectionEngine", () => {
  it("should execute all protection validators", async () => {

    // Arrange

    const engine = new DefaultProtectionEngine();

    const observation: Observation = {
      id: "obs-1",

      source: {
        id: "user-1",
        type: "USER",
      },

      status: "RECEIVED",
    };

    // Act

    const assessments = await engine.analyze(observation);

    // Assert

    expect(assessments).toHaveLength(1);

    expect(assessments[0].category).toBe("SOURCE");
    expect(assessments[0].outcome).toBe("POSITIVE");
    expect(assessments[0].confidence).toBe("HIGH");

  });
});