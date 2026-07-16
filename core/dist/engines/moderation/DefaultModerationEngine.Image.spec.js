"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ImageAnalysis_1 = require("../../domain/ImageAnalysis");
const UserContent_1 = require("../../domain/UserContent");
const ModerationContext_1 = require("./ModerationContext");
const DefaultModerationEngine_1 = require("./DefaultModerationEngine");
const DefaultModerationPolicy_1 = require("./DefaultModerationPolicy");
(0, vitest_1.describe)("DefaultModerationEngine - Image Moderation", () => {
    const engine = new DefaultModerationEngine_1.DefaultModerationEngine(new DefaultModerationPolicy_1.DefaultModerationPolicy());
    (0, vitest_1.it)("rifiuta un'immagine con watermark", () => {
        const analysis = new ImageAnalysis_1.ImageAnalysis(0, // pornografia
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
        0);
        const result = engine.modera(new ModerationContext_1.ModerationContext(new UserContent_1.UserContent("Titolo", "Descrizione", []), analysis));
        (0, vitest_1.expect)(result.isRejected()).toBe(true);
        (0, vitest_1.expect)(result.evidences.some((e) => e.tipo === "WATERMARK")).toBe(true);
    });
});
//# sourceMappingURL=DefaultModerationEngine.Image.spec.js.map