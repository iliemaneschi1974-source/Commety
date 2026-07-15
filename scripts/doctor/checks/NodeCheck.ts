import { execSync } from "node:child_process";

import { PlatformCheck } from "./PlatformCheck";
import { PlatformCheckResult } from "../model/PlatformCheckResult";

/**
 * ============================================================================
 * NODE CHECK
 * ----------------------------------------------------------------------------
 *
 * Verifica la presenza di Node.js
 * e la possibilità di eseguire il runtime.
 *
 * ============================================================================
 */
export class NodeCheck
  implements PlatformCheck {

  public readonly name =
    "Node.js";

  execute(): PlatformCheckResult {

    try {

      const version =
        execSync(
          "node -v",
          { encoding: "utf8" }
        ).trim();

      return new PlatformCheckResult(

        this.name,

        true,

        `Runtime disponibile (${version}).`

      );

    } catch {

      return new PlatformCheckResult(

        this.name,

        false,

        "Node.js non disponibile.",

        "Installare oppure verificare il PATH di Node.js."

      );

    }

  }

}