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
import type { Assessment } from "../../domain/Assessment";
import type { Observation } from "../../domain/Observation";
import type { ProtectionEngine } from "./ProtectionEngine";
export declare class DefaultProtectionEngine implements ProtectionEngine {
    /**
     * Validator utilizzati dal Protection Engine.
     *
     * Ogni validator possiede una singola responsabilità.
     */
    private readonly validators;
    /**
     * Analizza una Observation eseguendo tutti i validator.
     */
    analyze(observation: Observation): Promise<ReadonlyArray<Assessment>>;
}
//# sourceMappingURL=DefaultProtectionEngine.d.ts.map