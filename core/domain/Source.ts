/**
 * ============================================================================
 * COMMETY CORE
 * Domain Model
 * ----------------------------------------------------------------------------
 * Source
 *
 * Una Source rappresenta l'origine di una Observation.
 *
 * Una Source NON è necessariamente un utente.
 *
 * Può rappresentare qualsiasi entità in grado di osservare
 * un fenomeno del mondo reale.
 *
 * Esempi:
 *
 * - Utente
 * - Intelligenza Artificiale
 * - Ente Pubblico
 * - Webcam
 * - Radar
 * - Sensore
 * - Sistema interno
 *
 * La Source descrive "chi osserva", non "cosa osserva".
 * ============================================================================
 */

/**
 * Tipologie di Source supportate dal Core.
 */
export type SourceType =
  | "USER"
  | "AI"
  | "PUBLIC_AUTHORITY"
  | "WEBCAM"
  | "RADAR"
  | "SENSOR"
  | "SYSTEM";

/**
 * Source
 *
 * Value Object che identifica l'origine di una Observation.
 */
export interface Source {
  /**
   * Identificatore stabile della Source.
   *
   * Per un utente corrisponderà all'id dell'utente.
   * Per una webcam sarà l'id della webcam.
   * Per un radar sarà l'id del radar.
   */
  readonly id: string;

  /**
   * Tipologia della Source.
   */
  readonly type: SourceType;
}