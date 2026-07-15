import { PlatformDoctor } from "./PlatformDoctor";
import { NodeCheck } from "./checks/NodeCheck";
import { ConsolePrinter } from "./printer/ConsolePrinter";

/**
 * ============================================================================
 * COMMETTY PLATFORM DOCTOR
 * ----------------------------------------------------------------------------
 *
 * Punto di ingresso del Platform Doctor.
 *
 * Registra tutti i controlli disponibili,
 * esegue la diagnosi della piattaforma
 * e visualizza il risultato finale.
 * ============================================================================
 */

const doctor = new PlatformDoctor([
  new NodeCheck(),
]);

const result = doctor.execute();

new ConsolePrinter().print(result);