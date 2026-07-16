import * as fs from "node:fs";
import * as path from "node:path";

import { PlatformCheck } from "../../../checks/PlatformCheck";
import { PlatformCheckResult } from "../../../model/PlatformCheckResult";

/**
 * ============================================================================
 * CORE DIST CHECK
 * ----------------------------------------------------------------------------
 *
 * Verifica che il Commetty Core sia stato
 * compilato correttamente.
 *
 * Controlla la presenza della cartella dist
 * e dei file di entry point.
 * ============================================================================
 */
export class CoreDistCheck
  implements PlatformCheck {

  public readonly name =
    "Core compilato";

  execute(): PlatformCheckResult {

    const root =
      process.cwd();

    const dist =
      path.join(
        root,
        "core",
        "dist"
      );

    if (!fs.existsSync(dist)) {

      return new PlatformCheckResult(

        this.name,

        false,

        "Cartella core/dist non trovata.",

        "Eseguire: cd core && npm run build"

      );

    }

    const indexJs =
      path.join(
        dist,
        "index.js"
      );

    if (!fs.existsSync(indexJs)) {

      return new PlatformCheckResult(

        this.name,

        false,

        "File core/dist/index.js non trovato.",

        "Ricompilare il Core."

      );

    }

    const indexTypes =
      path.join(
        dist,
        "index.d.ts"
      );

    if (!fs.existsSync(indexTypes)) {

      return new PlatformCheckResult(

        this.name,

        false,

        "File core/dist/index.d.ts non trovato.",

        "Ricompilare il Core."

      );

    }

    return new PlatformCheckResult(

      this.name,

      true,

      "Core compilato correttamente."

    );

  }

}