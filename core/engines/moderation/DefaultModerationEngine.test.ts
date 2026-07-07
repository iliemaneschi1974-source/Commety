import { describe, expect, it } from "vitest";

import { UserContent } from "../../domain/UserContent";
import { DefaultModerationEngine } from "./DefaultModerationEngine";
import { DefaultModerationPolicy } from "./DefaultModerationPolicy";

const engine = new DefaultModerationEngine(
  new DefaultModerationPolicy()
);

describe("DefaultModerationEngine", () => {
  it("approva un contenuto pulito", () => {
    const decision = engine.modera(
      new UserContent(
        "Traffico rallentato sulla Tangenziale.",
        []
      )
    );

    expect(decision.isApprovato()).toBe(true);
  });

  it("approva un contenuto vuoto", () => {
    const decision = engine.modera(
      new UserContent()
    );

    expect(decision.isApprovato()).toBe(true);
  });
});