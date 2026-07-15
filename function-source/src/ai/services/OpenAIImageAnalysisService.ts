import OpenAI from "openai";

import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";
import { OpenAIVisionRequestBuilder } from "../mapping/OpenAIVisionRequestBuilder";
import { OpenAIResponseParser } from "../parser/OpenAIResponseParser";
import { ImageAnalysisService } from "./ImageAnalysisService";

/**
 * Implementazione OpenAI del servizio
 * di analisi immagini.
 */
export class OpenAIImageAnalysisService
  implements ImageAnalysisService {

  private readonly requestBuilder =
    new OpenAIVisionRequestBuilder();

  private readonly responseParser =
    new OpenAIResponseParser();

  constructor(
    private readonly client: OpenAI
  ) {}

  /**
   * Analizza una segnalazione
   * tramite OpenAI Vision.
   */
  async analyze(
    request: VisionAnalysisRequest
  ): Promise<OpenAIImageAnalysisResponse> {

    const openAiRequest =
      this.requestBuilder.build(
        request
      );

    console.info(
      "Sending images to OpenAI Vision...",
      {
        images: request.images.length,
      }
    );

    const response =
      await this.client.responses.create(
        openAiRequest
      );

    if (!("output_text" in response)) {
      throw new Error(
        "Unexpected streaming response."
      );
    }

    const output =
      response.output_text.trim();

    if (output.length === 0) {
      throw new Error(
        "OpenAI returned an empty response."
      );
    }

    console.info(
      "OpenAI response received."
    );

    return this.responseParser.parse(
      output
    );

  }

}