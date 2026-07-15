import { PlatformCheckResult } from "./PlatformCheckResult";

/**
 * ============================================================================
 * DOCTOR RESULT
 * ----------------------------------------------------------------------------
 *
 * Rappresenta il risultato complessivo prodotto
 * dal Platform Doctor.
 *
 * Contiene l'insieme dei controlli eseguiti
 * durante una sessione di diagnosi.
 *
 * Non contiene logica di business.
 * ============================================================================
 */
export class PlatformDoctorResult {

  /**
   * Risultati prodotti da tutti i controlli.
   */
  public readonly checks:
    readonly PlatformCheckResult[];

  constructor(
    checks: readonly PlatformCheckResult[]
  ) {

    this.checks = checks;

  }

  /**
   * Indica se tutti i controlli
   * sono stati superati.
   */
  get success(): boolean {

    return this.checks.every(
      (check) => check.success
    );

  }

}