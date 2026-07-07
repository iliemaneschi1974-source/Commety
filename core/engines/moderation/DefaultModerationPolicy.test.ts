import { describe, expect, it } from "vitest";

import { DefaultModerationPolicy } from "./DefaultModerationPolicy";
import { ModerationEvidence } from "./ModerationEvidence";

const policy = new DefaultModerationPolicy();

function evidenza(
  tipo: ModerationEvidence["tipo"]
): ModerationEvidence {
  return new ModerationEvidence(
    tipo,
    "",
    1,
    "TESTO"
  );
}

describe("DefaultModerationPolicy", () => {
  it("approva quando non sono presenti evidenze", () => {
    expect(
      policy.valuta([]).isApprovato()
    ).toBe(true);
  });

  it("rifiuta in presenza di una violazione bloccante", () => {
    expect(
      policy
        .valuta([
          evidenza("IMMAGINE_PORNOGRAFICA"),
        ])
        .isRifiutato()
    ).toBe(true);
  });

  it("richiede revisione manuale in presenza di dati personali", () => {
    expect(
      policy
        .valuta([
          evidenza("DATI_PERSONALI_RILEVATI"),
        ])
        .isRevisioneManuale()
    ).toBe(true);
  });

  it("limita il contenuto in presenza di un watermark", () => {
    expect(
      policy
        .valuta([
          evidenza("WATERMARK"),
        ])
        .isLimitato()
    ).toBe(true);
  });

  it("dà priorità alle violazioni bloccanti rispetto alle altre", () => {
    expect(
      policy
        .valuta([
          evidenza("WATERMARK"),
          evidenza("DATI_PERSONALI_RILEVATI"),
          evidenza("IMMAGINE_PORNOGRAFICA"),
        ])
        .isRifiutato()
    ).toBe(true);
  });

  it("dà priorità alla revisione rispetto alla limitazione", () => {
    expect(
      policy
        .valuta([
          evidenza("WATERMARK"),
          evidenza("DATI_PERSONALI_RILEVATI"),
        ])
        .isRevisioneManuale()
    ).toBe(true);
  });
});