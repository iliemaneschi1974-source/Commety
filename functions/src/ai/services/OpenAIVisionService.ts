import OpenAI from "openai";

import { ImageContent } from "../../storage/ImageContent";
import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
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
   * Analizza le immagini della segnalazione.
   */
  async analyze(
    immagini: readonly ImageContent[]
  ): Promise<OpenAIImageAnalysisResponse> {

    return this.imageAnalysisService.analyze(
      immagini
    );

  }

}