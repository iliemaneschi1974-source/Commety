/**
 * Categorie ufficiali delle segnalazioni di Commetty.
 *
 * Questo è il linguaggio ubiquo del dominio.
 */
export const REPORT_CATEGORIES = [
  "meteo",
  "traffico",
  "pericolo",
  "evento",
  "mare",
] as const;

/**
 * Categoria di una segnalazione.
 */
export type ReportCategory =
  (typeof REPORT_CATEGORIES)[number];

/**
 * Verifica se una stringa rappresenta
 * una categoria valida del dominio.
 */
export function isReportCategory(
  value: string,
): value is ReportCategory {
  return REPORT_CATEGORIES.includes(
    value as ReportCategory,
  );
}