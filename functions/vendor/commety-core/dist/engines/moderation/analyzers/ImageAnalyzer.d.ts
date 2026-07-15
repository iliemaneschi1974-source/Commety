import { ImageAnalysis } from "../../../domain/ImageAnalysis";
/**
 * Analizza una o più immagini e produce
 * un modello di dominio indipendente
 * dal provider utilizzato.
 *
 * Le implementazioni potranno utilizzare
 * OpenAI, Gemini, Azure Vision,
 * AWS Rekognition oppure modelli locali.
 *
 * Il dominio conosce esclusivamente
 * ImageAnalysis.
 */
export interface ImageAnalyzer {
    analizza(immagini: readonly string[]): Promise<readonly ImageAnalysis[]>;
}
//# sourceMappingURL=ImageAnalyzer.d.ts.map