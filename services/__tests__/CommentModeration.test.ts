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

  it.each([
    "Non fare la puttana",
    "Sono delle puttane",
    "Sei una troia",
    "Sono delle troie",
  ])("rifiuta l'insulto pesante: %s", (text) => {
    const moderationEngine = new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

    const result = moderationEngine.modera(new UserContent(text, []));

    expect(result.isRejected()).toBe(true);
  });

  it.each([
    "Sei un bastardo",
    "Siete degli imbecilli",
    "Che cretine",
    "È un leccaculo",
    "Quei rompicoglioni non smettono",
  ])("rifiuta gli altri insulti pesanti: %s", (text) => {
    const moderationEngine = new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

    const result = moderationEngine.modera(new UserContent(text, []));

    expect(result.isRejected()).toBe(true);
  });

  it.each([
    "Dio",
    "Madonna",
    "Gesù",
    "Cristo",
    "Porco dio",
  ])("rifiuta anche i riferimenti blasfemi: %s", (text) => {
    const moderationEngine = new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

    const result = moderationEngine.modera(new UserContent(text, []));

    expect(result.isRejected()).toBe(true);
    expect(
      result.evidences.some((evidence) => evidence.tipo === "BESTEMMIE")
    ).toBe(true);
  });
});
