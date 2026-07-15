"use strict";
/**
 * ============================================================================
 * COMMETY CORE
 * Protection Engine
 * ----------------------------------------------------------------------------
 * DefaultProtectionEngine
 *
 * Prima implementazione del Protection Engine.
 *
 * Questa implementazione coordina i validator di protezione
 * e raccoglie gli Assessment prodotti.
 *
 * Non prende Decision.
 * Non crea Evidence.
 * Non modifica il dominio.
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProtectionEngine = void 0;
const SourceValidator_1 = require("./validators/SourceValidator");
class DefaultProtectionEngine {
    /**
     * Validator utilizzati dal Protection Engine.
     *
     * Ogni validator possiede una singola responsabilità.
     */
    validators = [
        new SourceValidator_1.SourceValidator(),
    ];
    /**
     * Analizza una Observation eseguendo tutti i validator.
     */
    async analyze(observation) {
        const assessments = [];
        for (const validator of this.validators) {
            const result = await validator.analyze(observation);
            assessments.push(...result);
        }
        return assessments;
    }
}
exports.DefaultProtectionEngine = DefaultProtectionEngine;
//# sourceMappingURL=DefaultProtectionEngine.js.map