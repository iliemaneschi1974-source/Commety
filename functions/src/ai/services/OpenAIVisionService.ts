import OpenAI from "openai";

import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";
import { OpenAIImageAnalysisService } from "./OpenAIImageAnalysisService";

/**
 * Facade dell'intera pipeline Vision.
 *
 * Il trigger Firestore utilizzerà esclusivamente
 * questa classe senza conoscere i dettagli
 * dell'implementazione OpenAI.
 */
export class OpenAIVisionService {

  private readonly imageAnalysisService: OpenAIImageAnalysisService;

  constructor(
    client: OpenAI
  ) {
    this.imageAnalysisService =
      new OpenAIImageAnalysisService(client);
  }

  /**
   * Analizza una segnalazione tramite
   * la pipeline Vision.
   */
  async analyze(
    request: VisionAnalysisRequest
  ): Promise<OpenAIImageAnalysisResponse> {

    return this.imageAnalysisService.analyze(
      request
    );

  }

}