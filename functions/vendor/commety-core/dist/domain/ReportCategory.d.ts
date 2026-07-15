/**
 * Categorie ufficiali delle segnalazioni di Commetty.
 *
 * Questo è il linguaggio ubiquo del dominio.
 */
export declare const REPORT_CATEGORIES: readonly ["meteo", "traffico", "pericolo", "evento", "mare"];
/**
 * Categoria di una segnalazione.
 */
export type ReportCategory = (typeof REPORT_CATEGORIES)[number];
/**
 * Verifica se una stringa rappresenta
 * una categoria valida del dominio.
 */
export declare function isReportCategory(value: string): value is ReportCategory;
//# sourceMappingURL=ReportCategory.d.ts.map