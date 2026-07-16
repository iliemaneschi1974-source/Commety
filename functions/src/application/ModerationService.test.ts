import { describe, expect, it } from "vitest";

import { ModerationService } from "./ModerationService";
import { ModerationRequest } from "./ModerationRequest";

describe("ModerationService", () => {

  const service =
    new ModerationService();

  it("rifiuta un'immagine con watermark, AI e volto", () => {

    const request =
      new ModerationRequest(

        "traffico",

        "Incidente",

        "Code sul raccordo",

        [],

        {

          pornografia: 0,
          nudita: 0,
          childSafety: 0,
          violenza: 0,
          gore: 0,
          armi: 0,
          animalCruelty: 0,

          aiGenerated: 1,
          screenshot: 0,
          watermark: 1,
          meme: 0,

          volti: 1,
          targhe: 0,
          documenti: 0,

          confidence: 0.95,

          descrizione:
            "Immagine con watermark e volto",

          consistency: {

            descriptionSimilarity: 1,
            titleSimilarity: 1,
            categorySimilarity: 1,
            confidence: 1,

          },

        }

      );

    const result =
      service.execute(
        request
      );

    expect(
      result.isRejected()
    ).toBe(true);

    expect(
      result.evidences.some(
        (e) => e.tipo === "WATERMARK"
      )
    ).toBe(true);

    expect(
      result.evidences.some(
        (e) => e.tipo === "VOLTO_RILEVATO"
      )
    ).toBe(true);

    expect(
      result.evidences.some(
        (e) => e.tipo === "IMMAGINE_AI"
      )
    ).toBe(true);

  });

});