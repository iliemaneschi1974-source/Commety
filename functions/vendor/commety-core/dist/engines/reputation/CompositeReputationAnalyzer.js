"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompositeReputationAnalyzer = void 0;
/**
 * Analizzatore composito del Reputation Engine.
 *
 * Coordina l'esecuzione delle ReputationRule senza
 * conoscere la logica implementativa delle singole regole.
 */
class CompositeReputationAnalyzer {
    rules;
    constructor(rules) {
        this.rules = rules;
    }
    /**
     * Analizza il contesto ricevuto eseguendo tutte
     * le regole configurate.
     */
    analizza(contesto) {
        return this.rules.flatMap((rule) => rule.analizza(contesto));
    }
}
exports.CompositeReputationAnalyzer = CompositeReputationAnalyzer;
//# sourceMappingURL=CompositeReputationAnalyzer.js.map