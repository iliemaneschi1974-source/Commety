import { ImageContent } from "../../storage/ImageContent";

/**
 * Converte le immagini scaricate
 * da Firebase Storage nel formato
 * richiesto dalle Responses API.
 */
export class ImageContentMapper {

  /**
   * Restituisce una Data URI
   * utilizzabile da OpenAI Vision.
   */
  toDataUris(
    images: readonly ImageContent[]
  ): string[] {

    return images.map((image) => {

      const base64 =
        image.bytes.toString("base64");

      return (
        `data:${image.mimeType};base64,${base64}`
      );

    });

  }

}