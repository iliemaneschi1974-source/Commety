import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";

/**
 * Responsabile della conversione della
 * risposta di OpenAI nel DTO utilizzato
 * da Commetty.
 *
 * Questa classe centralizza tutta la logica
 * di parsing e validazione del provider AI.
 */
export class OpenAIResponseParser {

  /**
   * Converte il testo JSON prodotto
   * dal modello nel DTO di dominio.
   *
   * Lancia un'eccezione se il JSON
   * non è valido.
   */
  parse(
    json: string
  ): OpenAIImageAnalysisResponse {

    const parsed =
      JSON.parse(json) as Partial<OpenAIImageAnalysisResponse>;

    return {

      pornografia:
        parsed.pornografia ?? 0,

      nudita:
        parsed.nudita ?? 0,

      childSafety:
        parsed.childSafety ?? 0,

      violenza:
        parsed.violenza ?? 0,

      gore:
        parsed.gore ?? 0,

      armi:
        parsed.armi ?? 0,

      animalCruelty:
        parsed.animalCruelty ?? 0,

      aiGenerated:
        parsed.aiGenerated ?? 0,

      screenshot:
        parsed.screenshot ?? 0,

      watermark:
        parsed.watermark ?? 0,

      meme:
        parsed.meme ?? 0,

      volti:
        parsed.volti ?? 0,

      targhe:
        parsed.targhe ?? 0,

      documenti:
        parsed.documenti ?? 0,

      confidence:
        parsed.confidence ?? 0,

      descrizione:
        parsed.descrizione ?? "",

    };

  }

}