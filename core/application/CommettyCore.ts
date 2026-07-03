/**
 * ============================================================================
 * COMMETY CORE
 * Application Layer
 * ----------------------------------------------------------------------------
 * CommettyCore
 *
 * Punto di ingresso ufficiale del Commetty Core.
 *
 * Tutte le richieste verso il Core devono passare da questa classe.
 *
 * Responsabilità:
 * - Ricevere le Observation.
 * - Orchestrare gli Engine.
 * - Restituire gli Assessment prodotti.
 *
 * Non contiene logiche di business.
 * ============================================================================
 */

import type { Assessment } from "../domain/Assessment";
import type { Observation } from "../domain/Observation";

import type { ProtectionEngine } from "../engines/protection/ProtectionEngine";
import { DefaultProtectionEngine } from "../engines/protection/DefaultProtectionEngine";

export class CommettyCore {
  constructor(
    private readonly protectionEngine: ProtectionEngine = new DefaultProtectionEngine()
  ) {}

  /**
   * Punto di ingresso del Core.
   */
  async process(
    observation: Observation
  ): Promise<ReadonlyArray<Assessment>> {
    return this.protectionEngine.analyze(observation);
  }
}