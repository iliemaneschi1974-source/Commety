import { ImageAnalysis } from "../../../domain/ImageAnalysis";
import { ImageAnalyzer } from "./ImageAnalyzer";
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
export declare class CompositeImageAnalyzer implements ImageAnalyzer {
    private readonly analyzers;
    constructor(analyzers: readonly ImageAnalyzer[]);
    analizza(immagini: readonly string[]): Promise<readonly ImageAnalysis[]>;
}
//# sourceMappingURL=CompositeImageAnalyzer.d.ts.map