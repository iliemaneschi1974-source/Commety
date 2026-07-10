import { ImageContent } from "../../storage/ImageContent";
import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";

/**
 * Contratto per qualsiasi servizio
 * in grado di analizzare una o più immagini.
 *
 * Le implementazioni potranno utilizzare
 * OpenAI, Gemini, Azure Vision,
 * AWS Rekognition oppure modelli locali.
 */
export interface ImageAnalysisService {

  /**
   * Analizza una o più immagini.
   *
   * @param immagini Contenuto binario delle immagini.
   * @returns Risultato strutturato prodotto dal provider AI.
   */
  analyze(
    immagini: readonly ImageContent[]
  ): Promise<OpenAIImageAnalysisResponse>;

}