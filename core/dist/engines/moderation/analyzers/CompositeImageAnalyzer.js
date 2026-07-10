"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeImageAnalyzer = void 0;
/**
 * Coordina l'esecuzione di uno o più ImageAnalyzer.
 *
 * Il Composite rappresenta il punto di ingresso
 * dell'Image Analysis Engine.
 *
 * Ogni analyzer è libero di utilizzare qualsiasi
 * tecnologia (OpenAI, Gemini, Azure, modelli locali, ecc.),
 * mentre il dominio continua a conoscere esclusivamente
 * ImageAnalysis.
 */
class CompositeImageAnalyzer {
    analyzers;
    constructor(analyzers) {
        this.analyzers = analyzers;
    }
    async analizza(immagini) {
        const analyses = [];
        for (const analyzer of this.analyzers) {
            const result = await analyzer.analizza(immagini);
            analyses.push(...result);
        }
        return analyses;
    }
}
exports.CompositeImageAnalyzer = CompositeImageAnalyzer;
//# sourceMappingURL=CompositeImageAnalyzer.js.map