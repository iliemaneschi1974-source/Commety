import { describe, expect, it } from "vitest";

import { SourceValidator } from "./SourceValidator";

import type { Observation } from "../../../domain/Observation";

describe("SourceValidator", () => {
  it("should accept a USER source", async () => {
    const validator = new SourceValidator();

    const observation: Observation = {
      id: "obs-1",

      source: {
        id: "user-1",
        type: "USER",
      },

      status: "RECEIVED",
    };

    const assessments = await validator.analyze(observation);

    expect(assessments).toHaveLength(1);

    expect(assessments[0].category).toBe("SOURCE");
    expect(assessments[0].outcome).toBe("POSITIVE");
    expect(assessments[0].confidence).toBe("HIGH");
  });
});