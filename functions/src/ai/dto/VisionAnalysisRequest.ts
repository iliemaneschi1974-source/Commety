import { ImageContent } from "../../storage/ImageContent";

/**
 * Contesto completo inviato
 * alla pipeline di Vision.
 *
 * È indipendente dal provider AI utilizzato.
 */
export interface VisionAnalysisRequest {

  /**
   * Titolo della segnalazione.
   */
  title?: string;

  /**
   * Descrizione della segnalazione.
   */
  description?: string;

  /**
   * Categoria della segnalazione.
   */
  category?: string;

  /**
   * Immagini da analizzare.
   */
  images: readonly ImageContent[];

}