/**
 * ============================================================================
 * COMMETY CORE
 * Domain Model
 * ----------------------------------------------------------------------------
 * Evidence
 *
 * Un'Evidence rappresenta una conclusione prodotta dal Commety Core
 * attraverso l'analisi di una o più Observation.
 *
 * Le Evidence non vengono create dagli utenti.
 * Sono generate dagli Engine del Core.
 * ============================================================================
 */

/**
 * Direzione dell'Evidence.
 *
 * SUPPORTS:
 *   aumenta la coerenza della rappresentazione corrente.
 *
 * CONTRADICTS:
 *   riduce la coerenza della rappresentazione corrente.
 *
 * NEUTRAL:
 *   non modifica significativamente la rappresentazione.
 */
export type EvidenceDirection =
  | "SUPPORTS"
  | "CONTRADICTS"
  | "NEUTRAL";

/**
 * Stato dell'Evidence.
 */
export type EvidenceStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "DISCARDED";

/**
 * Evidence
 *
 * Una conclusione prodotta dal Core.
 */
export interface Evidence {
  /**
   * Identificatore stabile.
   */
  readonly id: string;

  /**
   * Effetto sulla rappresentazione corrente.
   */
  readonly direction: EvidenceDirection;

  /**
   * Stato corrente.
   */
  readonly status: EvidenceStatus;
}