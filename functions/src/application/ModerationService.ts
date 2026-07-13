import {
  DefaultModerationEngine,
  DefaultModerationPolicy,
  ImageAnalysis,
  ModerationContext,
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
 * Application Service responsabile dell'orchestrazione
 * della moderazione dei contenuti analizzati dalla AI.
 *
 * Coordina:
 *
 * - conversione DTO → Domain;
 * - costruzione del UserContent;
 * - costruzione del ModerationContext;
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
   * Esegue la moderazione della segnalazione.
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

    const context =
      new ModerationContext(
        userContent,
        imageAnalysis
      );

    return this.engine.modera(
      context
    );

  }

}