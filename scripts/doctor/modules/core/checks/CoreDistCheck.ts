import * as fs from "node:fs";
import * as path from "node:path";

import { PlatformCheck } from "../../../checks/PlatformCheck";
import { PlatformCheckResult } from "../../../model/PlatformCheckResult";

/**
 * ============================================================================
 * CORE DIST CHECK
 * ----------------------------------------------------------------------------
 *
 * Verifica che la cartella dist del Commetty Core
 * sia presente.
 *
 * ============================================================================
 */
export class CoreDistCheck
  implements PlatformCheck {

  public readonly name =
    "Core dist";

  execute(): PlatformCheckResult {

    const distPath =
      path.resolve(
        process.cwd(),
        "core",
        "dist"
      );

    if (!fs.existsSync(distPath)) {

      return new PlatformCheckResult(

        this.name,

        false,

        "Cartella core/dist non trovata.",

        "Eseguire: cd core && npm run build"

      );

    }

    return new PlatformCheckResult(

      this.name,

      true,

      "Cartella core/dist presente."

    );

  }

}