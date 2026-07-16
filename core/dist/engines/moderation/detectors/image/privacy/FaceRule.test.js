"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ImageAnalysis_1 = require("../../../../../domain/ImageAnalysis");
const ModerationEvidence_1 = require("../../../ModerationEvidence");
const FaceRule_1 = require("./FaceRule");
const rule = new FaceRule_1.FaceRule();
(0, vitest_1.describe)("FaceRule", () => {
    (0, vitest_1.it)("non produce evidenze sotto la soglia", () => {
        const analysis = new ImageAnalysis_1.ImageAnalysis(0, // pornografia
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
        (0, vitest_1.expect)(rule.analizza(analysis)).toEqual([]);
    });
    (0, vitest_1.it)("produce una evidenza sopra la soglia", () => {
        const analysis = new ImageAnalysis_1.ImageAnalysis(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.90);
        const expected = new ModerationEvidence_1.ModerationEvidence("VOLTO_RILEVATO", "Volto chiaramente riconoscibile rilevato.", 0.90, "IMMAGINE");
        const result = rule.analizza(analysis);
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0].equals(expected)).toBe(true);
    });
});
//# sourceMappingURL=FaceRule.test.js.map