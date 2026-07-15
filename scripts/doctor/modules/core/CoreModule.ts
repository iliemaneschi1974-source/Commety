import { PlatformCheck } from "../../checks/PlatformCheck";
import { PlatformCheckResult } from "../../model/PlatformCheckResult";

/**
 * ============================================================================
 * CORE CHECK
 * ----------------------------------------------------------------------------
 *
 * Coordina tutti i controlli relativi
 * al Commetty Core.
 *
 * Non contiene direttamente logica
 * di verifica.
 * ============================================================================
 */
export class CoreModule
  implements PlatformCheck {

  public readonly name =
    "Commetty Core";

  execute(): PlatformCheckResult {

    return new PlatformCheckResult(

      this.name,

      true,

      "Controllo non ancora implementato."

    );

  }

}