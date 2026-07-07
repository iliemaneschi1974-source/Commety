import { describe, expect, it } from "vitest";

import { ReputationContextBuilder } from "./testing/ReputationContextBuilder";

describe("ReputationContext", () => {
  it("riconosce la presenza di un segnale", () => {
    const context = ReputationContextBuilder.create()
      .conReportConfermatoNelTempo()
      .build();

    expect(
      context.haSegnale("REPORT_CONFERMATO_NEL_TEMPO")
    ).toBe(true);
  });

  it("restituisce tutti i segnali del tipo richiesto", () => {
    const context = ReputationContextBuilder.create()
      .conConfermaCommunity(3)
      .build();

    expect(
      context.segnaliDiTipo("CONFERMA_COMMUNITY")
    ).toHaveLength(3);
  });

  it("conta correttamente i segnali del tipo richiesto", () => {
    const context = ReputationContextBuilder.create()
      .conConfermaCommunity(5)
      .build();

    expect(
      context.contaSegnali("CONFERMA_COMMUNITY")
    ).toBe(5);
  });

  it("restituisce zero quando il segnale non è presente", () => {
    const context = ReputationContextBuilder.create().build();

    expect(
      context.contaSegnali("CONFERMA_COMMUNITY")
    ).toBe(0);
  });
});