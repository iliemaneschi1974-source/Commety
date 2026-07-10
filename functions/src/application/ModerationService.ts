import {
  DefaultModerationEngine,
  DefaultModerationPolicy,
  ImageAnalysis,
  ModerationResult,
  UserContent,
} from "@commety/core";

import { OpenAIImageAnalysisMapper } from "../ai/mapping/OpenAIImageAnalysisMapper";
import { ModerationRequest } from "./ModerationRequest";

/**
 * ============================================================================
 * MODERATION SERVICE
 * ----------------------------------------------------------------------------
 *
 * Application Service responsabile
 * dell'orchestrazione della moderazione.
 *
 * Coordina:
 *
 * - costruzione del UserContent;
 * - conversione DTO → ImageAnalysis;
 * - esecuzione del Moderation Engine.
 *
 * Non contiene logica di business.
 * ============================================================================
 */
export class ModerationService {

  private readonly engine =
    new DefaultModerationEngine(
      new DefaultModerationPolicy()
    );

  /**
   * Avvia la moderazione completa
   * di una segnalazione.
   */
  execute(
    request: ModerationRequest
  ): ModerationResult {

    const userContent =
      new UserContent(
        request.title,
        request.description,
        request.images
      );

    const imageAnalysis: ImageAnalysis =
      OpenAIImageAnalysisMapper.from(
        request.analysis
      );

    return this.engine.modera(
      userContent,
      imageAnalysis
    );

  }

}