import { describe, expect, it } from "vitest";

import { UserContent } from "../../core/domain/UserContent";
import { DefaultModerationEngine } from "../../core/engines/moderation/DefaultModerationEngine";
import { DefaultModerationPolicy } from "../../core/engines/moderation/DefaultModerationPolicy";

describe("moderazione dei commenti", () => {
  it("rifiuta un commento con linguaggio volgare", () => {
    const moderationEngine = new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

    const result = moderationEngine.modera(
      new UserContent("Che cazzo di situazione", [])
    );

    expect(result.isRejected()).toBe(true);
    expect(
      result.evidences.some(
        (evidence) => evidence.tipo === "PAROLACCE"
      )
    ).toBe(true);
  });

  it("rifiuta anche le varianti al plurale", () => {
    const moderationEngine = new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

    const result = moderationEngine.modera(
      new UserContent("Siete degli stronzi", [])
    );

    expect(result.isRejected()).toBe(true);
    expect(
      result.evidences.some(
        (evidence) => evidence.tipo === "PAROLACCE"
      )
    ).toBe(true);
  });
});
