/**
 * ============================================================================
 * COMMETY CORE
 * Domain Model
 * ----------------------------------------------------------------------------
 * Incident
 *
 * Rappresenta la migliore ricostruzione corrente di un fenomeno del mondo reale.
 *
 * Un Incident NON è una segnalazione.
 * Un Incident viene costruito ed evoluto dal Core attraverso Observation,
 * Evidence e Decision.
 * ============================================================================
 */

export type IncidentStatus =
  | "HYPOTHESIS"
  | "EMERGING"
  | "OBSERVED"
  | "CONFIRMED"
  | "STABLE"
  | "RESOLVING"
  | "RESOLVED"
  | "ARCHIVED";

export interface Incident {

  /**
   * Identificatore stabile dell'Incident.
   */
  readonly id: string;

  /**
   * Stato corrente del Lifecycle.
   */
  readonly status: IncidentStatus;

}