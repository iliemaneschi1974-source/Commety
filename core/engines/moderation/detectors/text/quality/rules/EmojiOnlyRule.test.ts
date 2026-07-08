import { describe, expect, it } from "vitest";

import { UserContent } from "../../../../../../domain/UserContent";
import { EmojiOnlyRule } from "./EmojiOnlyRule";

const rule = new EmojiOnlyRule();

describe("EmojiOnlyRule", () => {
  it("rileva un contenuto composto solo da emoji", () => {
    const evidenze = rule.analizza(
      new UserContent("😀😀😀😀😀", [])
    );

    expect(evidenze).toHaveLength(1);
    expect(evidenze[0].tipo).toBe(
      "SOLO_EMOJI"
    );
  });

  it("non segnala un testo normale", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente sulla A1",
        []
      )
    );

    expect(evidenze).toHaveLength(0);
  });

  it("non segnala un testo con emoji", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "🚗 Incidente sulla A1",
        []
      )
    );

    expect(evidenze).toHaveLength(0);
  });

  it("ignora un contenuto vuoto", () => {
    const evidenze = rule.analizza(
      new UserContent("", [])
    );

    expect(evidenze).toHaveLength(0);
  });
});