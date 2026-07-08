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

export class ReportSubmissionResult {
  private constructor(
    public readonly success: boolean,
    public readonly message?: string
  ) {}

  /**
   * La pubblicazione è stata completata con successo.
   */
  static success(): ReportSubmissionResult {
    return new ReportSubmissionResult(true);
  }

  /**
   * La pubblicazione non è stata completata.
   */
  static failure(
    message: string
  ): ReportSubmissionResult {
    return new ReportSubmissionResult(
      false,
      message
    );
  }
}