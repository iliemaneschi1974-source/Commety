import { describe, expect, it } from "vitest";

import { UserContent } from "../../../../../../domain/UserContent";
import { PunctuationOnlyRule } from "./PunctuationOnlyRule";

const rule = new PunctuationOnlyRule();

describe("PunctuationOnlyRule", () => {
  it("rileva un contenuto composto solo da punteggiatura", () => {
    const evidenze = rule.analizza(
      new UserContent("...........", [])
    );

    expect(evidenze).toHaveLength(1);
    expect(evidenze[0].tipo).toBe(
      "SOLO_PUNTEGGIATURA"
    );
  });

  it("non segnala un testo normale", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente sulla Cassia",
        []
      )
    );

    expect(evidenze).toHaveLength(0);
  });

  it("non segnala un testo con punteggiatura", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente!!!",
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