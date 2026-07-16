import { UserContent } from "@/core/domain/UserContent";

import { core } from "@/services/core";

import { ReportSubmissionResult } from "@/services/dto/ReportSubmissionResult";
import { ModerationMessageResolver } from "@/services/moderation/ModerationMessageResolver";
import { createReport } from "@/services/reports";

import { CreateReportInput } from "@/types/report";

/**
 * ============================================================================
 * APPLICATION SERVICE
 * ----------------------------------------------------------------------------
 *
 * Responsabile della pubblicazione di una nuova segnalazione.
 *
 * Flusso:
 *
 * 1) Moderazione sincrona del testo tramite Core.
 * 2) Se il testo viene rifiutato, la pubblicazione termina.
 * 3) Se il testo è valido, viene creata la segnalazione.
 * 4) La moderazione AI delle immagini viene eseguita
 *    successivamente dal backend.
 *
 * ============================================================================
 */

const moderationMessageResolver =
  new ModerationMessageResolver();

export async function submitReport(
  input: CreateReportInput
): Promise<ReportSubmissionResult> {

  /**
   * Moderazione immediata del testo.
   */
  const contenuto =
    new UserContent(
      input.title,
      input.description,
      []
    );

  const risultato =
    core.moderate(contenuto);

  if (risultato.isRejected()) {

    const message =
      moderationMessageResolver.resolve(
        risultato.evidences
      );

    return ReportSubmissionResult.failure(
      message
    );

  }

  /**
   * Il testo è valido.
   * La segnalazione viene creata.
   */
  const reportRef =
    await createReport(input);

  return ReportSubmissionResult.success(
    reportRef.id
  );

}