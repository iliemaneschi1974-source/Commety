"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSafetyDetector = void 0;
const AnimalCrueltyRule_1 = require("./rules/AnimalCrueltyRule");
const ChildSafetyRule_1 = require("./rules/ChildSafetyRule");
const GoreRule_1 = require("./rules/GoreRule");
const NudityRule_1 = require("./rules/NudityRule");
const PornographyRule_1 = require("./rules/PornographyRule");
const ViolenceRule_1 = require("./rules/ViolenceRule");
const WeaponRule_1 = require("./rules/WeaponRule");
/**
 * Coordina tutte le regole appartenenti
 * alla famiglia Image Safety.
 */
class ImageSafetyDetector {
    rules = [
        new PornographyRule_1.PornographyRule(),
        new NudityRule_1.NudityRule(),
        new ChildSafetyRule_1.ChildSafetyRule(),
        new ViolenceRule_1.ViolenceRule(),
        new GoreRule_1.GoreRule(),
        new WeaponRule_1.WeaponRule(),
        new AnimalCrueltyRule_1.AnimalCrueltyRule(),
    ];
    analizza(analisi) {
        const evidenze = [];
        for (const rule of this.rules) {
            evidenze.push(...rule.analizza(analisi));
        }
        return evidenze;
    }
}
exports.ImageSafetyDetector = ImageSafetyDetector;
//# sourceMappingURL=ImageSafetyDetector.js.map