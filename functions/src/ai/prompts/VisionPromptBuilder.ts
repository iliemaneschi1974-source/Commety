import { VisionAnalysisRequest } from "../dto/VisionAnalysisRequest";
import { IMAGE_ANALYSIS_PROMPT } from "./image-analysis.prompt";

/**
 * Costruisce il prompt completo
 * inviato al modello Vision.
 *
 * Questa classe è responsabile
 * esclusivamente della costruzione
 * del contesto testuale della segnalazione.
 *
 * Non conosce OpenAI né le Responses API.
 */
export class VisionPromptBuilder {

  /**
   * Costruisce il prompt finale
   * utilizzato dal modello Vision.
   */
  build(
    request: VisionAnalysisRequest
  ): string {

    const sections: string[] = [];

    sections.push(
      "You are analyzing a report submitted by a user."
    );

    sections.push(
      "Use both the report information and the attached images."
    );

    sections.push(
      "Determine whether the visual content is coherent with the report."
    );

    sections.push("");

    sections.push("REPORT INFORMATION");

    sections.push("");

    sections.push(
      `Category: ${request.category ?? "Unknown"}`
    );

    sections.push(
      `Title: ${request.title ?? ""}`
    );

    sections.push(
      `Description: ${request.description ?? ""}`
    );

    sections.push("");

    sections.push(
      IMAGE_ANALYSIS_PROMPT
    );

    return sections.join("\n");

  }

}