import { PlatformCheck } from "../../checks/PlatformCheck";
import { PlatformCheckResult } from "../../model/PlatformCheckResult";

import { CoreDistCheck } from "./checks/CoreDistCheck";

/**
 * ============================================================================
 * CORE MODULE
 * ----------------------------------------------------------------------------
 *
 * Modulo del Platform Doctor dedicato
 * al Commetty Core.
 *
 * Coordina tutti i controlli relativi
 * al Core.
 * ============================================================================
 */
export class CoreModule
  implements PlatformCheck {

  public readonly name =
    "Commetty Core";

  private readonly checks:
    readonly PlatformCheck[] = [

      new CoreDistCheck(),

    ];

  execute(): PlatformCheckResult {

    const results =
      this.checks.map(
        (check) => check.execute()
      );

    const failed =
      results.find(
        (result) => !result.success
      );

    if (failed) {

      return failed;

    }

    return new PlatformCheckResult(

      this.name,

      true,

      "Tutti i controlli del Core superati."

    );

  }

}