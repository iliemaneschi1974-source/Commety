import { describe, expect, it } from "vitest";

import { CommettyCore } from "./CommettyCore";

import type { Observation } from "../domain/Observation";

describe("CommettyCore", () => {
  it("should process an observation and return assessments", async () => {

    // Arrange

    const core = new CommettyCore();

    const observation: Observation = {
      id: "obs-1",

      source: {
        id: "user-1",
        type: "USER",
      },

      status: "RECEIVED",
    };

    // Act

    const assessments = await core.process(observation);

    // Assert

    expect(assessments).toHaveLength(1);

    expect(assessments[0].category).toBe("SOURCE");
    expect(assessments[0].outcome).toBe("POSITIVE");
    expect(assessments[0].confidence).toBe("HIGH");
    expect(assessments[0].reason).toContain("supported");

  });
});