/**
 * DTO restituito dal provider AI.
 *
 * Questo modello rappresenta il contratto
 * tra OpenAI e Commetty.
 */
export interface OpenAIImageAnalysisResponse {

  pornografia: number;

  nudita: number;

  childSafety: number;

  violenza: number;

  gore: number;

  armi: number;

  animalCruelty: number;

  aiGenerated: number;

  screenshot: number;

  watermark: number;

  meme: number;

  volti: number;

  targhe: number;

  documenti: number;

  /**
   * Livello di confidenza dell'intera analisi.
   *
   * Valore compreso tra 0 e 1.
   */
  confidence: number;

  /**
   * Breve descrizione oggettiva
   * dell'immagine.
   */
  descrizione: string;

}