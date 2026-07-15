"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPORT_CATEGORIES = void 0;
exports.isReportCategory = isReportCategory;
/**
 * Categorie ufficiali delle segnalazioni di Commetty.
 *
 * Questo è il linguaggio ubiquo del dominio.
 */
exports.REPORT_CATEGORIES = [
    "meteo",
    "traffico",
    "pericolo",
    "evento",
    "mare",
];
/**
 * Verifica se una stringa rappresenta
 * una categoria valida del dominio.
 */
function isReportCategory(value) {
    return exports.REPORT_CATEGORIES.includes(value);
}
//# sourceMappingURL=ReportCategory.js.map