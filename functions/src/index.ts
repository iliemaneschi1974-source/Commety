import { setGlobalOptions } from "firebase-functions/v2";

import { expirationScheduler } from "./schedulers/expirationScheduler";

/**
 * Configurazione globale delle Cloud Functions.
 */
setGlobalOptions({
  maxInstances: 10,
});

/**
 * Scheduler Lifecycle Engine.
 */
export { expirationScheduler };