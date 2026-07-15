import * as logger from "firebase-functions/logger";

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

    logger.info(
      "Entering ModerationService",
      {
        category: request.category,
        title: request.title,
        images: request.images.length,
      }
    );

    const userContent =
      new UserContent(
        request.title,
        request.description,
        request.images
      );

    logger.info(
      "UserContent created successfully."
    );
   

    const imageAnalysis: ImageAnalysis =
      OpenAIImageAnalysisMapper.from(
        request.analysis
      );

    

    logger.info(
      "Mapped ImageAnalysis",
      {
        pornografia: imageAnalysis.pornografia,
        nudita: imageAnalysis.nudita,
        violenza: imageAnalysis.violenza,
        watermark: imageAnalysis.watermark,
        volti: imageAnalysis.volti,
        targhe: imageAnalysis.targhe,
        documenti: imageAnalysis.documenti,
        meme: imageAnalysis.meme,
        screenshot: imageAnalysis.screenshot,
        aiGenerated: imageAnalysis.aiGenerated,
      }
    );

    logger.info(
      "ImageAnalysis mapped successfully."
    );

    

    const context =
      new ModerationContext(
        userContent,
        imageAnalysis
        
      );

    logger.info(
      "ModerationContext created successfully."
    );

    const result =
      this.engine.modera(
        context
      );

    logger.info(
      "Moderation result",
      {
        decision: result.decision.value,
        evidences: result.evidences.map(
          (e) => e.tipo
        ),
      }
    );

    logger.info(
      "Leaving ModerationService",
      {
        decision: result.decision.value,
        evidences: result.evidences.length,
      }
    );

    return result;

  }

}