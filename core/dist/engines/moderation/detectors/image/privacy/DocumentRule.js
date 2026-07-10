"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
const ImageModerationThresholds_1 = require("../ImageModerationThresholds");
/**
 * Rileva la presenza di documenti
 * contenenti potenziali dati personali.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce un'evidenza di moderazione
 * quando la probabilità supera la soglia prevista.
 */
class DocumentRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        if (analisi.documenti < ImageModerationThresholds_1.ImageModerationThresholds.DOCUMENTI) {
            return [];
        }
        return [
            this.creaEvidence("DATI_PERSONALI_RILEVATI", "Documento contenente dati personali rilevato.", analisi.documenti)
        ];
    }
}
exports.DocumentRule = DocumentRule;
//# sourceMappingURL=DocumentRule.js.map