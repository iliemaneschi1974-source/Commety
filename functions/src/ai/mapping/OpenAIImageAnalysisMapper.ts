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
 * Il provider restituisce valori discreti
 * compresi tra 0 e 5.
 *
 * Il Core, invece, lavora esclusivamente
 * con probabilità comprese tra 0.0 e 1.0.
 *
 * Il mapper ha quindi la responsabilità
 * di normalizzare tutti i valori numerici.
 * ============================================================================
 */
export class OpenAIImageAnalysisMapper {

  /**
   * Converte un valore discreto (0-5)
   * in una probabilità (0.0-1.0).
   */
  private static normalize(
    value: number
  ): number {

    return Math.max(
      0,
      Math.min(
        1,
        value / 5
      )
    );

  }

  /**
   * Converte la risposta del provider OpenAI
   * nel modello di dominio ImageAnalysis.
   */
  static from(
    response: OpenAIImageAnalysisResponse
  ): ImageAnalysis {

    return new ImageAnalysis(

      this.normalize(response.pornografia),

      this.normalize(response.nudita),

      this.normalize(response.childSafety),

      this.normalize(response.violenza),

      this.normalize(response.gore),

      this.normalize(response.armi),

      this.normalize(response.animalCruelty),

      this.normalize(response.aiGenerated),

      this.normalize(response.screenshot),

      this.normalize(response.watermark),

      this.normalize(response.meme),

      this.normalize(response.volti),

      this.normalize(response.targhe),

      this.normalize(response.documenti),

      response.descrizione

    );

  }

}