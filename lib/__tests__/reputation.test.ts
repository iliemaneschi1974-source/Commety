import { describe, expect, it } from "vitest";

import { getReputationProgress } from "../reputation";

describe("getReputationProgress", () => {
  it("calcola correttamente l'avanzamento del livello 4", () => {
    expect(getReputationProgress(582)).toEqual({
      level: 4,
      currentLevelXp: 82,
      xpForNextLevel: 300,
      remainingXp: 218,
    });
  });

  it("gestisce il livello massimo", () => {
    expect(getReputationProgress(4000)).toEqual({
      level: 10,
      currentLevelXp: 200,
      xpForNextLevel: null,
      remainingXp: 0,
    });
  });
});
