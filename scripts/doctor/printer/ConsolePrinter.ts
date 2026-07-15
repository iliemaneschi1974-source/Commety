import { PlatformDoctorResult } from "../model/PlatformDoctorResult";

/**
 * ============================================================================
 * CONSOLE PRINTER
 * ----------------------------------------------------------------------------
 *
 * Responsabile della visualizzazione
 * del risultato prodotto dal Platform Doctor.
 *
 * Non contiene alcuna logica di verifica.
 * Si limita esclusivamente alla stampa.
 * ============================================================================
 */
export class ConsolePrinter {

  /**
   * Visualizza il report finale.
   */
  print(
  result: PlatformDoctorResult
): void {

    console.log("");

    console.log(
      "══════════════════════════════════════════════"
    );

    console.log(
      "           COMMETTY PLATFORM DOCTOR"
    );

    console.log(
      "══════════════════════════════════════════════"
    );

    console.log("");

    for (const check of result.checks) {

      console.log(

        `${check.success ? "✔" : "✘"} ${check.name}`

      );

      console.log(

        `    ${check.message}`

      );

      if (check.suggestion) {

        console.log(

          `    Suggerimento: ${check.suggestion}`

        );

      }

      console.log("");

    }

    console.log(
      "══════════════════════════════════════════════"
    );

    console.log(

      result.success
        ? "READY TO DEPLOY"
        : "DEPLOY NON CONSENTITO"

    );

    console.log(
      "══════════════════════════════════════════════"
    );

    console.log("");

  }

}