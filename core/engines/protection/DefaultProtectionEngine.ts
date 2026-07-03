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

import { SourceValidator } from "./validators/SourceValidator";

export class DefaultProtectionEngine implements ProtectionEngine {

  /**
   * Validator utilizzati dal Protection Engine.
   *
   * Ogni validator possiede una singola responsabilità.
   */
  private readonly validators = [
    new SourceValidator(),
  ];

  /**
   * Analizza una Observation eseguendo tutti i validator.
   */
  async analyze(
    observation: Observation
  ): Promise<ReadonlyArray<Assessment>> {

    const assessments: Assessment[] = [];

    for (const validator of this.validators) {

      const result = await validator.analyze(observation);

      assessments.push(...result);

    }

    return assessments;

  }

}