import { setGlobalOptions } from "firebase-functions/v2";

import { reportCreatedTrigger } from "./firestore/reportCreatedTrigger";
import { reportUpdatedTrigger } from "./firestore/reportUpdatedTrigger";

import { testOpenAI } from "./http/testOpenAI";

import { expirationScheduler } from "./schedulers/expirationScheduler";
import { deleteAccount } from "./callable/deleteAccount";

/**
 * Configurazione globale delle Cloud Functions.
 */
setGlobalOptions({
  maxInstances: 10,
});

/**
 * Scheduler del Lifecycle Engine.
 */
export { expirationScheduler };

/**
 * Trigger della moderazione testuale.
 */
export { reportCreatedTrigger };

/**
 * Trigger della AI Pipeline.
 */
export { reportUpdatedTrigger };

/**
 * Endpoint diagnostico OpenAI.
 */
export { testOpenAI };

/**
 * Cancellazione definitiva dell'account e dei relativi contenuti.
 */
export { deleteAccount };
