"use strict";
/**
 * ============================================================================
 * COMMETY CORE
 * Protection Engine
 * ----------------------------------------------------------------------------
 * SourceValidator
 *
 * Verifica che la Source di una Observation sia supportata
 * dal Commetty Core.
 *
 * Responsabilità:
 *
 * - Analizzare esclusivamente la Source.
 * - Non prendere Decision.
 * - Non modificare il dominio.
 * - Produrre un Assessment spiegabile.
 * ============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceValidator = void 0;
class SourceValidator {
    /**
     * Tipologie di Source attualmente supportate dal Core.
     */
    static SUPPORTED_SOURCE_TYPES = new Set([
        "USER",
        "AI",
        "PUBLIC_AUTHORITY",
        "WEBCAM",
        "RADAR",
        "SENSOR",
        "SYSTEM",
    ]);
    async analyze(observation) {
        const supported = SourceValidator.SUPPORTED_SOURCE_TYPES.has(observation.source.type);
        const assessment = {
            id: crypto.randomUUID(),
            category: "SOURCE",
            outcome: supported
                ? "POSITIVE"
                : "NEGATIVE",
            confidence: "HIGH",
            reason: supported
                ? `Source type '${observation.source.type}' is supported.`
                : `Source type '${observation.source.type}' is not supported.`,
        };
        return [assessment];
    }
}
exports.SourceValidator = SourceValidator;
//# sourceMappingURL=SourceValidator.js.map