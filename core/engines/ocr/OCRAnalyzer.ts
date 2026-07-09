import { OCRAnalysis } from "../../domain/OCRAnalysis";

/**
 * Contratto implementato da qualsiasi
 * motore di estrazione del testo.
 *
 * Il Core rimane completamente indipendente
 * dal provider utilizzato.
 *
 * Implementazioni future:
 *
 * - OpenAIOCRAnalyzer
 * - AzureOCRAnalyzer
 * - GoogleVisionOCRAnalyzer
 * - AwsTextractOCRAnalyzer
 */
export interface OCRAnalyzer {

  /**
   * Estrae il testo contenuto
   * in una o più immagini.
   *
   * @param immagini URL o percorsi delle immagini.
   * @returns Analisi OCR prodotte dal provider.
   */
  analizza(
    immagini: readonly string[]
  ): Promise<readonly OCRAnalysis[]>;

}