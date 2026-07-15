import OpenAI from "openai";

import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";
import { OpenAIVisionService } from "../services/OpenAIVisionService";

/**
 * Pipeline principale dell'intelligenza artificiale.
 *
 * Coordina tutti i servizi AI senza esporre
 * i dettagli implementativi ai trigger Firestore.
 *
 * In futuro orchestrerà:
 *
 * - Vision
 * - OCR
 * - Face Detection
 * - Watermark Detection
 * - Screenshot Detection
 * - AI Generated Detection
 * - Moderation
 * - Reputation
 */
export class AIPipeline {

  private readonly visionService: OpenAIVisionService;

  constructor(
    client: OpenAI
  ) {
    this.visionService =
      new OpenAIVisionService(client);
  }

  /**
   * Avvia la pipeline AI della segnalazione.
   */
  async execute(
    request: VisionAnalysisRequest
  ): Promise<OpenAIImageAnalysisResponse> {

    return this.visionService.analyze(
      request
    );

  }

}