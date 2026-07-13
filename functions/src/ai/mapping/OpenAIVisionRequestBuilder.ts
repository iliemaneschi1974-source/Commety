import OpenAI from "openai";

import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";
import { ImageContentMapper } from "./ImageContentMapper";
import { VisionPromptBuilder } from "../prompts/VisionPromptBuilder";

/**
 * Costruisce la richiesta completa
 * destinata alle Responses API
 * di OpenAI Vision.
 */
export class OpenAIVisionRequestBuilder {

  private readonly mapper =
    new ImageContentMapper();

  private readonly promptBuilder =
    new VisionPromptBuilder();

  /**
   * Costruisce la richiesta completa
   * per l'analisi della segnalazione.
   */
  build(
    request: VisionAnalysisRequest
  ): OpenAI.Responses.ResponseCreateParams {

    const prompt =
      this.promptBuilder.build(
        request
      );

    const dataUris =
      this.mapper.toDataUris(
        request.images
      );

    const content: OpenAI.Responses.ResponseInputContent[] = [
      {
        type: "input_text",
        text: prompt,
      },
      ...dataUris.map((uri) => ({
        type: "input_image" as const,
        image_url: uri,
        detail: "auto" as const,
      })),
    ];

    return {

      model: "gpt-5-mini",

      stream: false,

      input: [
        {
          role: "user",
          content,
        },
      ],

    };

  }

}