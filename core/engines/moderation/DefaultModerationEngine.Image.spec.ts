import { describe, expect, it } from "vitest";

import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";

import { ModerationContext } from "./ModerationContext";
import { DefaultModerationEngine } from "./DefaultModerationEngine";
import { DefaultModerationPolicy } from "./DefaultModerationPolicy";

describe("DefaultModerationEngine - Image Moderation", () => {

  const engine =
    new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

  it("rifiuta un'immagine con watermark", () => {

    const analysis =
      new ImageAnalysis(

        0, // pornografia
        0, // nudita
        0, // childSafety
        0, // violenza
        0, // gore
        0, // armi
        0, // animalCruelty

        0, // aiGenerated
        0, // screenshot
        1, // watermark
        0, // meme

        0, // volti
        0, // targhe
        0, // documenti

      );

    const result =
      engine.modera(

        new ModerationContext(

          new UserContent(
            "Titolo",
            "Descrizione",
            []
          ),

          analysis

        )

      );

    expect(
      result.isRejected()
    ).toBe(true);

    expect(
      result.evidences.some(
        (e) => e.tipo === "WATERMARK"
      )
    ).toBe(true);

  });

});