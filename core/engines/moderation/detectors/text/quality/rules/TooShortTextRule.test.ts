import { describe, expect, it } from "vitest";

import { UserContent } from "../../../../../../domain/UserContent";
import { TooShortTextRule } from "./TooShortTextRule";

const rule = new TooShortTextRule();

describe("TooShortTextRule", () => {
  it("rileva un testo troppo breve", () => {
    const evidenze = rule.analizza(
      new UserContent("test", [])
    );

    expect(evidenze).toHaveLength(1);
    expect(evidenze[0].tipo).toBe(
      "TESTO_TROPPO_BREVE"
    );
  });

  it("rileva un testo troppo breve nella descrizione", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente\ntest",
        []
      )
    );

    expect(evidenze).toHaveLength(1);
    expect(evidenze[0].tipo).toBe(
      "TESTO_TROPPO_BREVE"
    );
  });

  it("non segnala una segnalazione composta da una sola parola significativa", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente",
        []
      )
    );

    expect(evidenze).toHaveLength(0);
  });

  it("non segnala un testo normale", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Traffico intenso sulla A1",
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