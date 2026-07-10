import { OpenAIImageAnalysisResponse } from "../dto/OpenAIImageAnalysisResponse";

/**
 * Risultato completo della AI Pipeline.
 *
 * In questa prima versione contiene
 * esclusivamente l'analisi delle immagini.
 *
 * In futuro verranno aggiunti:
 *
 * - OCR
 * - Privacy
 * - Face Detection
 * - Watermark
 * - Screenshot
 * - Meme
 * - AI Generated
 * - Moderation
 * - Reputation
 */
export interface AIPipelineResult {

  /**
   * Analisi Vision restituita da OpenAI.
   */
  imageAnalysis: OpenAIImageAnalysisResponse;

}