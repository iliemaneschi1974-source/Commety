import { UserContent } from "@/core/domain/UserContent";

import { core } from "@/services/core";
import { ReportSubmissionResult } from "@/services/dto/ReportSubmissionResult";
import { createReport } from "@/services/reports";

import { CreateReportInput } from "@/types/report";

/**
 * Application Service responsabile
 * della pubblicazione di una segnalazione.
 *
 * Progressivamente diventerà il punto
 * di orchestrazione dell'intero flusso
 * di pubblicazione.
 */
export async function submitReport(
  input: CreateReportInput
): Promise<ReportSubmissionResult> {
  const contenuto = new UserContent(
    `${input.title}\n${input.description}`,
    []
  );

  const decisione = core.moderate(contenuto);

  console.info(
    "[Moderation]",
    decisione.value
  );

  if (decisione.isRifiutato()) {
    console.warn(
      "[Moderation] Segnalazione rifiutata."
    );

    return ReportSubmissionResult.failure(
      "La segnalazione non rispetta le regole della community."
    );
  }

  await createReport(input);

  return ReportSubmissionResult.success();
}