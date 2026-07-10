import OpenAI from "openai";

import { ImageContent } from "../../storage/ImageContent";
import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
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
   * Analizza una o più immagini
   * tramite OpenAI Vision.
   */
  async analyze(
    immagini: readonly ImageContent[]
  ): Promise<OpenAIImageAnalysisResponse> {

    const request =
      this.requestBuilder.build(
        immagini
      );

    console.info(
      "Sending images to OpenAI Vision...",
      {
        images: immagini.length,
      }
    );

    const response =
      await this.client.responses.create(
        request
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