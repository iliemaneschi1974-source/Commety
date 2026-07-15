"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ImageAnalysis_1 = require("../../../../../domain/ImageAnalysis");
const ModerationEvidence_1 = require("../../../ModerationEvidence");
const PornographyRule_1 = require("./PornographyRule");
const rule = new PornographyRule_1.PornographyRule();
(0, vitest_1.describe)("PornographyRule", () => {
    (0, vitest_1.it)("non produce evidenze sotto la soglia", () => {
        const analysis = new ImageAnalysis_1.ImageAnalysis(0.89 // pornografia
        );
        (0, vitest_1.expect)(rule.analizza(analysis)).toEqual([]);
    });
    (0, vitest_1.it)("produce una evidenza sopra la soglia", () => {
        const analysis = new ImageAnalysis_1.ImageAnalysis(0.95 // pornografia
        );
        const expected = new ModerationEvidence_1.ModerationEvidence("IMMAGINE_PORNOGRAFICA", "Contenuto pornografico rilevato.", 0.95, "IMMAGINE");
        const result = rule.analizza(analysis);
        (0, vitest_1.expect)(result).toHaveLength(1);
        (0, vitest_1.expect)(result[0].equals(expected)).toBe(true);
    });
});
//# sourceMappingURL=PornographyRule.test.js.map