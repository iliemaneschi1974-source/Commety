import { describe, expect, it } from "vitest";

import { UserContent } from "../../../../../../domain/UserContent";
import { GibberishRule } from "./GibberishRule";

const rule = new GibberishRule();

describe("GibberishRule", () => {
  it("rileva un testo privo di significato", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "sjjkdkjdkd djdkdkjdkd",
        []
      )
    );

    expect(evidenze).toHaveLength(1);
    expect(evidenze[0].tipo).toBe(
      "TESTO_NON_SIGNIFICATIVO"
    );
  });

  it("non segnala un testo normale", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente sulla via Cassia",
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

  it("ignora una parola significativa", () => {
    const evidenze = rule.analizza(
      new UserContent(
        "Incidente",
        []
      )
    );

    expect(evidenze).toHaveLength(0);
  });
});