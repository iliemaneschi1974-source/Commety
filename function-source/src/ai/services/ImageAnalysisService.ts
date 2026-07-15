import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";

/**
 * Contratto per qualsiasi servizio
 * in grado di analizzare una segnalazione
 * tramite modelli di Vision AI.
 *
 * Le implementazioni potranno utilizzare
 * OpenAI, Gemini, Azure Vision,
 * AWS Rekognition oppure modelli locali.
 */
export interface ImageAnalysisService {

  /**
   * Analizza una segnalazione
   * utilizzando il contesto completo.
   *
   * @param request Contesto della segnalazione.
   * @returns Risultato strutturato prodotto dal provider AI.
   */
  analyze(
    request: VisionAnalysisRequest
  ): Promise<OpenAIImageAnalysisResponse>;

}