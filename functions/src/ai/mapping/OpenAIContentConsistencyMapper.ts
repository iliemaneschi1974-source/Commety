import { ContentConsistencyAnalysis } from "@commety/core";

import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";

/**
 * ============================================================================
 * OPENAI CONTENT CONSISTENCY MAPPER
 * ----------------------------------------------------------------------------
 *
 * Traduce la valutazione di coerenza prodotta
 * dal provider OpenAI nel Value Object del Core.
 *
 * Il mapper non contiene alcuna logica di business.
 * Si limita esclusivamente alla conversione
 * Infrastructure → Domain.
 * ============================================================================
 */
export class OpenAIContentConsistencyMapper {

  /**
   * Converte la valutazione di coerenza
   * restituita da OpenAI nel modello
   * di dominio utilizzato dal Core.
   */
  static from(
    response: OpenAIImageAnalysisResponse
  ): ContentConsistencyAnalysis {

    return new ContentConsistencyAnalysis(

      response.consistency.descriptionSimilarity,

      response.consistency.titleSimilarity,

      response.consistency.categorySimilarity,

      response.consistency.confidence

    );

  }

}