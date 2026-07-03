/**
 * ============================================================================
 * COMMETY CORE
 * Engine Contract
 * ----------------------------------------------------------------------------
 * Validator
 *
 * Contratto comune per tutti i validator del Commety Core.
 *
 * Un Validator possiede una singola responsabilità:
 * analizzare un input del dominio e produrre zero, uno o più Assessment.
 *
 * I Validator:
 *
 * - NON modificano il dominio.
 * - NON prendono Decision.
 * - NON creano Evidence.
 * - NON aggiornano Incident.
 *
 * Producono esclusivamente Assessment.
 * ============================================================================
 */

import type { Assessment } from "../domain/Assessment";

/**
 * Contratto generico per tutti i validator.
 */
export interface Validator<TInput> {
  /**
   * Analizza un oggetto del dominio.
   *
   * @param input Oggetto da analizzare.
   *
   * @returns Una collezione immutabile di Assessment.
   */
  analyze(
    input: TInput
  ): Promise<ReadonlyArray<Assessment>>;
}