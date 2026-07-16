/**
 * ============================================================================
 * APPLICATION LAYER
 * ----------------------------------------------------------------------------
 * ReportSubmissionResult
 *
 * Rappresenta il risultato del caso d'uso di pubblicazione
 * di una segnalazione.
 *
 * Questo oggetto appartiene all'Application Layer e costituisce
 * l'unico contratto restituito al frontend.
 *
 * Non contiene alcuna logica di business.
 * ============================================================================
 */

import { ModerationMessage } from "@/services/moderation/ModerationMessage";

export class ReportSubmissionResult {

  private constructor(

    /**
     * Indica se la richiesta di pubblicazione
     * è stata accettata.
     *
     * Non rappresenta l'esito della moderazione.
     */
    public readonly success: boolean,

    /**
     * Identificativo della segnalazione appena creata.
     *
     * Verrà utilizzato dal frontend per attendere
     * il completamento della moderazione asincrona.
     */
    public readonly reportId?: string,

    /**
     * Messaggio destinato all'utente.
     *
     * Utilizzato esclusivamente nei casi
     * di errore lato frontend.
     */
    public readonly moderationMessage?: ModerationMessage

  ) {}

  /**
   * La segnalazione è stata creata.
   */
  static success(
    reportId: string
  ): ReportSubmissionResult {

    return new ReportSubmissionResult(
      true,
      reportId
    );

  }

  /**
   * La pubblicazione non è stata completata.
   */
  static failure(
    moderationMessage: ModerationMessage
  ): ReportSubmissionResult {

    return new ReportSubmissionResult(
      false,
      undefined,
      moderationMessage
    );

  }

}