"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSafetyImageRule = void 0;
const AbstractImageRule_1 = require("../AbstractImageRule");
/**
 * Classe base per tutte le Safety Rule.
 *
 * Implementa l'algoritmo comune di valutazione
 * dei contenuti potenzialmente pericolosi.
 *
 * Le sottoclassi devono solamente specificare:
 * - il valore da osservare;
 * - la soglia;
 * - il tipo di evidenza;
 * - la descrizione.
 */
class AbstractSafetyImageRule extends AbstractImageRule_1.AbstractImageRule {
    /**
     * Analizza una singola immagine.
     */
    analizza(analisi) {
        const confidenza = this.valore(analisi);
        if (confidenza < this.soglia()) {
            return [];
        }
        return [
            this.creaEvidence(this.tipo(), this.descrizione(), confidenza)
        ];
    }
}
exports.AbstractSafetyImageRule = AbstractSafetyImageRule;
//# sourceMappingURL=AbstractSafetyImageRule.js.map