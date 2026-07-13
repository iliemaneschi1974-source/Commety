"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescriptionConsistencyRule = void 0;
/**
 * Verifica la coerenza tra la descrizione
 * fornita dall'utente e quella ricavata
 * dall'analisi dell'immagine.
 *
 * Prima implementazione:
 * se manca il testo non produce evidenze.
 */
class DescriptionConsistencyRule {
    analizza(contenuto, immagine) {
        if (!contenuto.hasTesto()) {
            return [];
        }
        if (!immagine.descrizione) {
            return [];
        }
        /**
         * La logica verrà introdotta
         * nello sprint successivo.
         */
        return [];
    }
}
exports.DescriptionConsistencyRule = DescriptionConsistencyRule;
//# sourceMappingURL=DescriptionConsistencyRule.js.map