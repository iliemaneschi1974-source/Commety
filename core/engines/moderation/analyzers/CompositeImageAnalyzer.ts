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
export class CompositeImageAnalyzer implements ImageAnalyzer {
  constructor(
    private readonly analyzers: readonly ImageAnalyzer[]
  ) {}

  async analizza(
    immagini: readonly string[]
  ): Promise<readonly ImageAnalysis[]> {
    const analyses: ImageAnalysis[] = [];

    for (const analyzer of this.analyzers) {
      const result = await analyzer.analizza(immagini);
      analyses.push(...result);
    }

    return analyses;
  }
}