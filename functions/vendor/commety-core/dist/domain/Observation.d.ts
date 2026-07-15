/**
 * ============================================================================
 * COMMETY CORE
 * Domain Model
 * ----------------------------------------------------------------------------
 * Observation
 *
 * Rappresenta un'osservazione indipendente proveniente da una Source.
 *
 * Un'Observation NON rappresenta la realtà.
 *
 * È il contributo immutabile di una Source che descrive
 * la propria percezione di un fenomeno del mondo reale.
 *
 * Sarà il Commety Core, attraverso gli Engine, a trasformare
 * una o più Observation in Evidence.
 * ============================================================================
 */
import type { Source } from "./Source";
/**
 * Stato dell'Observation all'interno del Core.
 */
export type ObservationStatus = "RECEIVED" | "VALIDATING" | "VALID" | "REJECTED" | "ARCHIVED";
/**
 * Observation
 *
 * Una percezione immutabile del mondo reale prodotta da una Source.
 */
export interface Observation {
    /**
     * Identificatore stabile.
     */
    readonly id: string;
    /**
     * Origine dell'Observation.
     */
    readonly source: Source;
    /**
     * Stato corrente.
     */
    readonly status: ObservationStatus;
}
//# sourceMappingURL=Observation.d.ts.map