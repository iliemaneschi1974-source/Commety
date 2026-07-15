"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeImageDetector = void 0;
/**
 * Coordina l'esecuzione di tutte le ImageRule.
 *
 * Ogni regola osserva esclusivamente un aspetto
 * dell'immagine e produce eventuali evidenze
 * di moderazione.
 *
 * Il Composite raccoglie tutte le evidenze
 * prodotte dalle regole mantenendo le stesse
 * completamente indipendenti tra loro.
 */
class CompositeImageDetector {
    rules;
    constructor(rules) {
        this.rules = rules;
    }
    /**
     * Analizza tutte le immagini di un report.
     *
     * @param analyses Analisi prodotte dall'Image Analysis Engine.
     * @returns Tutte le evidenze prodotte dalle ImageRule.
     */
    analizza(analyses) {
        const evidences = [];
        for (const analysis of analyses) {
            for (const rule of this.rules) {
                evidences.push(...rule.analizza(analysis));
            }
        }
        return evidences;
    }
}
exports.CompositeImageDetector = CompositeImageDetector;
//# sourceMappingURL=CompositeImageDetector.js.map