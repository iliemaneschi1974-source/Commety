import { ImageAnalysis } from "@commety/core";

import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";

/**
 * ============================================================================
 * OPENAI IMAGE ANALYSIS MAPPER
 * ----------------------------------------------------------------------------
 *
 * Traduce il DTO prodotto dal provider OpenAI
 * nel modello di dominio utilizzato dal Core.
 *
 * Il mapper non contiene logica di business.
 * Effettua esclusivamente la trasformazione
 * tra Infrastructure e Domain.
 * ============================================================================
 */
export class OpenAIImageAnalysisMapper {

  /**
   * Converte la risposta del provider OpenAI
   * nel modello di dominio ImageAnalysis.
   */
  static from(
    response: OpenAIImageAnalysisResponse
  ): ImageAnalysis {

    return new ImageAnalysis(
      response.pornografia,
      response.nudita,
      response.childSafety,
      response.violenza,
      response.gore,
      response.armi,
      response.animalCruelty,
      response.aiGenerated,
      response.screenshot,
      response.watermark,
      response.meme,
      response.volti,
      response.targhe,
      response.documenti,
      response.descrizione
    );

  }

}