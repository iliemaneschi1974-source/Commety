import { PlatformCheck } from "./checks/PlatformCheck";
import { PlatformDoctorResult } from "./model/PlatformDoctorResult";

/**
 * ============================================================================
 * PLATFORM DOCTOR
 * ----------------------------------------------------------------------------
 *
 * Coordina l'esecuzione di tutti i controlli
 * registrati all'interno della piattaforma.
 *
 * Il Doctor non conosce la logica dei singoli
 * controlli.
 *
 * Si limita ad eseguirli e raccoglierne
 * i risultati.
 * ============================================================================
 */
export class PlatformDoctor {

  constructor(
    private readonly checks:
      readonly PlatformCheck[]
  ) {
  }

  /**
   * Esegue tutti i controlli.
   */
  execute(): PlatformDoctorResult {

    const results =
      this.checks.map(
        (check) => check.execute()
      );

    return new PlatformDoctorResult(
      results
    );

  }

}