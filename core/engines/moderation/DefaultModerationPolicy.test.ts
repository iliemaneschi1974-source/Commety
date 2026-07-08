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

  it("rifiuta in presenza di dati personali", () => {
    expect(
      policy
        .valuta([
          evidenza("DATI_PERSONALI_RILEVATI"),
        ])
        .isRifiutato()
    ).toBe(true);
  });

  it("rifiuta il contenuto in presenza di un watermark", () => {
    expect(
      policy
        .valuta([
          evidenza("WATERMARK"),
        ])
        .isRifiutato()
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

  it("rifiuta quando sono presenti più violazioni bloccanti", () => {
    expect(
      policy
        .valuta([
          evidenza("WATERMARK"),
          evidenza("DATI_PERSONALI_RILEVATI"),
        ])
        .isRifiutato()
    ).toBe(true);
  });

  it("richiede revisione manuale per un volto rilevato", () => {
    expect(
      policy
        .valuta([
          evidenza("VOLTO_RILEVATO"),
        ])
        .isRevisioneManuale()
    ).toBe(true);
  });

  it("richiede revisione manuale per una targa rilevata", () => {
    expect(
      policy
        .valuta([
          evidenza("TARGA_RILEVATA"),
        ])
        .isRevisioneManuale()
    ).toBe(true);
  });

  it("richiede revisione manuale per un possibile copyright", () => {
    expect(
      policy
        .valuta([
          evidenza("COPYRIGHT"),
        ])
        .isRevisioneManuale()
    ).toBe(true);
  });
});