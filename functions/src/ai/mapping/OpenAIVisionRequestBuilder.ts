import OpenAI from "openai";

import { ImageContent } from "../../storage/ImageContent";
import { IMAGE_ANALYSIS_PROMPT } from "../prompts/image-analysis.prompt";
import { ImageContentMapper } from "./ImageContentMapper";

/**
 * Costruisce la richiesta completa
 * destinata alle Responses API
 * di OpenAI Vision.
 */
export class OpenAIVisionRequestBuilder {

  private readonly mapper =
    new ImageContentMapper();

  /**
   * Costruisce la richiesta completa
   * per l'analisi delle immagini.
   */
  build(
    images: readonly ImageContent[]
  ): OpenAI.Responses.ResponseCreateParams {

    const dataUris =
      this.mapper.toDataUris(images);

    const content: OpenAI.Responses.ResponseInputContent[] = [
      {
        type: "input_text",
        text: IMAGE_ANALYSIS_PROMPT,
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