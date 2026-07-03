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
import type { SourceType } from "../../../domain/Source";

import type { Validator } from "../../Validator";

export class SourceValidator implements Validator<Observation> {

  /**
   * Tipologie di Source attualmente supportate dal Core.
   */
  private static readonly SUPPORTED_SOURCE_TYPES =
    new Set<SourceType>([
      "USER",
      "AI",
      "PUBLIC_AUTHORITY",
      "WEBCAM",
      "RADAR",
      "SENSOR",
      "SYSTEM",
    ]);

  async analyze(
    observation: Observation
  ): Promise<ReadonlyArray<Assessment>> {

    const supported = SourceValidator.SUPPORTED_SOURCE_TYPES.has(
      observation.source.type
    );

    const assessment: Assessment = {
      id: crypto.randomUUID(),

      category: "SOURCE",

      outcome: supported
        ? "POSITIVE"
        : "NEGATIVE",

      confidence: "HIGH",

      reason: supported
        ? `Source type '${observation.source.type}' is supported.`
        : `Source type '${observation.source.type}' is not supported.`,
    };

    return [assessment];

  }

}