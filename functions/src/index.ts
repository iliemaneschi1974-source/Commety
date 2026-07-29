import { setGlobalOptions } from "firebase-functions/v2";

import { reportCreatedTrigger } from "./firestore/reportCreatedTrigger";
import { reportUpdatedTrigger } from "./firestore/reportUpdatedTrigger";

import { testOpenAI } from "./http/testOpenAI";

import { expirationScheduler } from "./schedulers/expirationScheduler";
import { deleteAccount } from "./callable/deleteAccount";
import { chat } from "./callable/chat";
import { getPublicProfile } from "./callable/publicProfile";
import { communityAction } from "./callable/communityAction";
import { notifications } from "./callable/notifications";
import { deleteReportByAuthor } from "./callable/deleteReportByAuthor";
import { pushSettings } from "./callable/pushSettings";
import { userNotificationCreatedTrigger } from "./firestore/userNotificationCreatedTrigger";

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

/**
 * Chat privata per utenti registrati.
 */
export { chat };

/** Profilo pubblico, limitato ai dati scelti dall'utente. */
export { getPublicProfile };

/** Conferme e voti sullo stato delle segnalazioni. */
export { communityAction };

/** Aggiornamenti istituzionali destinati agli utenti. */
export { notifications };

/**
 * Cancellazione dell'autore con conservazione dello storico comunale.
 */
export { deleteReportByAuthor };

/** Preferenze e registrazione dei dispositivi per Web Push. */
export { pushSettings };

/** Invio push quando nasce un aggiornamento destinato a un utente. */
export { userNotificationCreatedTrigger };
