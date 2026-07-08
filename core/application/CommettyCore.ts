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
 * - Ricevere le richieste dell'applicazione.
 * - Orchestrare gli Engine.
 * - Esporre le capability del Core.
 *
 * Non contiene logiche di business.
 * ============================================================================
 */

import type { Assessment } from "../domain/Assessment";
import type { ImageAnalysis } from "../domain/ImageAnalysis";
import type { Observation } from "../domain/Observation";
import type { UserContent } from "../domain/UserContent";

import type { ProtectionEngine } from "../engines/protection/ProtectionEngine";
import { DefaultProtectionEngine } from "../engines/protection/DefaultProtectionEngine";

import type { ModerationEngine } from "../engines/moderation/ModerationEngine";
import { DefaultModerationEngine } from "../engines/moderation/DefaultModerationEngine";
import { DefaultModerationPolicy } from "../engines/moderation/DefaultModerationPolicy";
import { ModerationResult } from "../engines/moderation/ModerationResult";

export class CommettyCore {
  constructor(
    private readonly protectionEngine: ProtectionEngine =
      new DefaultProtectionEngine(),

    private readonly moderationEngine: ModerationEngine =
      new DefaultModerationEngine(
        new DefaultModerationPolicy()
      )
  ) {}

  /**
   * Entry point storico del Protection Engine.
   * Mantenuto per retrocompatibilità.
   */
  async process(
    observation: Observation
  ): Promise<ReadonlyArray<Assessment>> {
    return this.protectionEngine.analyze(observation);
  }

  /**
   * Entry point del Moderation Engine.
   */
  moderate(
    contenuto: UserContent,
    immagine?: ImageAnalysis
  ): ModerationResult {
    return this.moderationEngine.modera(
      contenuto,
      immagine
    );
  }
}