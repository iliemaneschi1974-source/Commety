import * as logger from "firebase-functions/logger";

import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";
import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";

/**
 * ============================================================================
 * AI LOGGER
 * ----------------------------------------------------------------------------
 *
 * Centralizza tutti i log prodotti dalla
 * pipeline di Intelligenza Artificiale.
 *
 * L'obiettivo è avere un formato uniforme
 * indipendentemente dal provider utilizzato.
 * ============================================================================
 */
export class AILogger {

  /**
   * Log della richiesta inviata
   * alla pipeline Vision.
   */
  logVisionRequest(
    request: VisionAnalysisRequest
  ): void {

    logger.info(
      "========== VISION REQUEST ==========",
      {
        category: request.category,
        title: request.title,
        description: request.description,
        images: request.images.length,
      }
    );

  }

  /**
   * Log della risposta grezza
   * restituita dal provider AI.
   */
  logOpenAIResponse(
    response: OpenAIImageAnalysisResponse
  ): void {

    logger.info(
      "========== OPENAI RESPONSE ==========",
      response
    );

  }

  /**
   * Log della valutazione di coerenza.
   */
  logConsistency(
    response: OpenAIImageAnalysisResponse
  ): void {

    logger.info(
      "========== CONTENT CONSISTENCY ==========",
      response.consistency
    );

  }

}