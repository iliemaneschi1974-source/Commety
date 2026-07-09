import { describe, expect, it } from "vitest";

import { ImageAnalysis } from "../../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { PornographyRule } from "./PornographyRule";

const rule = new PornographyRule();

describe("PornographyRule", () => {

  it("non produce evidenze sotto la soglia", () => {

    const analysis = new ImageAnalysis(
      0.89 // pornografia
    );

    expect(rule.analizza(analysis)).toEqual([]);

  });

  it("produce una evidenza sopra la soglia", () => {

    const analysis = new ImageAnalysis(
      0.95 // pornografia
    );

    const expected = new ModerationEvidence(
      "IMMAGINE_PORNOGRAFICA",
      "Contenuto pornografico rilevato.",
      0.95,
      "IMMAGINE"
    );

    const result = rule.analizza(analysis);

    expect(result).toHaveLength(1);
    expect(result[0].equals(expected)).toBe(true);

  });

});