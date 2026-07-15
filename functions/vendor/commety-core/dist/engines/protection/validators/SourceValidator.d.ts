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
import type { Assessment } from "../../../domain/Assessment";
import type { Observation } from "../../../domain/Observation";
import type { Validator } from "../../Validator";
export declare class SourceValidator implements Validator<Observation> {
    /**
     * Tipologie di Source attualmente supportate dal Core.
     */
    private static readonly SUPPORTED_SOURCE_TYPES;
    analyze(observation: Observation): Promise<ReadonlyArray<Assessment>>;
}
//# sourceMappingURL=SourceValidator.d.ts.map