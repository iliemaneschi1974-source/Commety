import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";

import { expireReports } from "../jobs/expireReportsJob";

/**
 * Controlla periodicamente le segnalazioni
 * ed esegue la scadenza automatica.
 *
 * Frequenza iniziale:
 * ogni 5 minuti.
 */
export const expirationScheduler = onSchedule(
  {
    schedule: "every 5 minutes",
    timeZone: "Europe/Rome",
    region: "europe-west1",
  },
  async () => {
    const result = await expireReports();

    logger.info("Expiration job completed", {
      scanned: result.scanned,
      expired: result.expired,
    });
  }
);