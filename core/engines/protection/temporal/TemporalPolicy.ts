import { ReportCategory } from "../../../domain/ReportCategory";

/**
 * Definisce la durata massima di validità
 * di una categoria di report.
 *
 * Il valore restituito è espresso in millisecondi.
 */
export interface TemporalPolicy {
  /**
   * Restituisce la durata massima di validità
   * per la categoria indicata.
   *
   * @param category Categoria del report.
   * @returns Durata massima in millisecondi.
   */
  getValidityDuration(category: ReportCategory): number;
}