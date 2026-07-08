import { UserContent } from "@/core/domain/UserContent";

import { core } from "@/services/core";
import { ReportSubmissionResult } from "@/services/dto/ReportSubmissionResult";
import { ModerationMessageResolver } from "@/services/moderation/ModerationMessageResolver";
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
const moderationMessageResolver =
  new ModerationMessageResolver();

export async function submitReport(
  input: CreateReportInput
): Promise<ReportSubmissionResult> {
  const contenuto = new UserContent(
    `${input.title}\n${input.description}`,
    []
  );

  const risultato =
    core.moderate(contenuto);

  console.info(
    "[Moderation]",
    risultato.decision.value
  );

  if (risultato.isRejected()) {
    console.info(
  "[Moderation Evidences]",
  risultato.evidences.map(
    (evidenza) => evidenza.tipo
  )
);
    const message =
      moderationMessageResolver.resolve(
        risultato.evidences
      );


    console.warn(
      "[Moderation]",
      message.title,
      "-",
      message.description
    );

    return ReportSubmissionResult.failure(
      message
    );
  }

  await createReport(input);

  return ReportSubmissionResult.success();
}