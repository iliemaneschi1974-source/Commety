import { describe, expect, it } from "vitest";

import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { FaceRule } from "./FaceRule";

const rule = new FaceRule();

describe("FaceRule", () => {

  it("non produce evidenze sotto la soglia", () => {

    const analysis = new ImageAnalysis(
      0, // pornografia
      0, // nudita
      0, // childSafety
      0, // violenza
      0, // gore
      0, // armi
      0, // animalCruelty
      0, // aiGenerated
      0, // screenshot
      0, // watermark
      0, // meme
      0.84 // volti
    );

    expect(rule.analizza(analysis)).toEqual([]);

  });

  it("produce una evidenza sopra la soglia", () => {

    const analysis = new ImageAnalysis(
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0.90
    );

    const expected = new ModerationEvidence(
  "VOLTO_RILEVATO",
  "Volto chiaramente riconoscibile rilevato.",
  0.90,
  "IMMAGINE"
);

    const result = rule.analizza(analysis);
    

    expect(result).toHaveLength(1);
    expect(result[0].equals(expected)).toBe(true);

  });

});