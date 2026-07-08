import { describe, expect, it } from "vitest";

import { UserContent } from "../../domain/UserContent";
import { DefaultModerationEngine } from "./DefaultModerationEngine";
import { DefaultModerationPolicy } from "./DefaultModerationPolicy";

const engine = new DefaultModerationEngine(
  new DefaultModerationPolicy()
);

describe("DefaultModerationEngine", () => {
  it("approva un contenuto pulito", () => {
    const result = engine.modera(
      new UserContent(
        "Traffico rallentato sulla Tangenziale.",
        []
      )
    );

    expect(result.isApproved()).toBe(true);
    expect(result.evidences).toHaveLength(0);
  });

  it("approva un contenuto vuoto", () => {
    const result = engine.modera(
      new UserContent()
    );

    expect(result.isApproved()).toBe(true);
    expect(result.evidences).toHaveLength(0);
  });
});