import { describe, expect, it } from "vitest";

import { DefaultPublicationEngine } from "./DefaultPublicationEngine";
import { DefaultPublicationPolicy } from "./DefaultPublicationPolicy";
import { PublicationEvidence } from "./PublicationEvidence";

const engine = new DefaultPublicationEngine(
  new DefaultPublicationPolicy(),
);

function evidence(
  trust: number,
): PublicationEvidence {
  return {
    trust: {
      value: trust,
      confidence: 1,
      reason: "",
    },
  };
}

describe("DefaultPublicationEngine", () => {
  it("pubblica la segnalazione con trust elevato", () => {
    expect(
      engine.decide(evidence(0.95)),
    ).toBe("PUBBLICA");
  });

  it("pubblica con riserva per trust medio-alto", () => {
    expect(
      engine.decide(evidence(0.75)),
    ).toBe("PUBBLICA_CON_RISERVA");
  });

  it("richiede conferme per trust medio", () => {
    expect(
      engine.decide(evidence(0.55)),
    ).toBe("RICHIEDI_CONFERME");
  });

  it("invia in revisione per trust basso", () => {
    expect(
      engine.decide(evidence(0.35)),
    ).toBe("REVISIONE");
  });

  it("rifiuta la segnalazione sotto la soglia minima", () => {
    expect(
      engine.decide(evidence(0.20)),
    ).toBe("RIFIUTA");
  });

  it("pubblica esattamente sulla soglia", () => {
    expect(
      engine.decide(evidence(0.90)),
    ).toBe("PUBBLICA");
  });

  it("pubblica con riserva esattamente sulla soglia", () => {
    expect(
      engine.decide(evidence(0.70)),
    ).toBe("PUBBLICA_CON_RISERVA");
  });

  it("richiede conferme esattamente sulla soglia", () => {
    expect(
      engine.decide(evidence(0.50)),
    ).toBe("RICHIEDI_CONFERME");
  });

  it("invia in revisione esattamente sulla soglia", () => {
    expect(
      engine.decide(evidence(0.30)),
    ).toBe("REVISIONE");
  });
});