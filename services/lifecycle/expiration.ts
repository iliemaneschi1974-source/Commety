import { Timestamp } from "firebase/firestore";

/**
 * Verifica se una segnalazione è scaduta.
 */
export function isReportExpired(
  expiresAt: Timestamp,
  now: Date = new Date()
): boolean {
  return expiresAt.toMillis() <= now.getTime();
}

/**
 * Restituisce il tempo rimanente
 * prima della scadenza.
 */
export function getRemainingTime(
  expiresAt: Timestamp,
  now: Date = new Date()
): number {
  return Math.max(
    expiresAt.toMillis() - now.getTime(),
    0
  );
}

/**
 * Verifica se è stata raggiunta
 * la scadenza massima.
 */
export function isMaxExpirationReached(
  maxExpiresAt: Timestamp,
  now: Date = new Date()
): boolean {
  return maxExpiresAt.toMillis() <= now.getTime();
}

/**
 * Verifica se la segnalazione
 * può essere prorogata.
 *
 * La proroga è consentita soltanto:
 *
 * - se la segnalazione non è scaduta;
 * - se non ha raggiunto maxExpiresAt;
 * - se è entrata nella extensionWindow.
 */
export function canExtendReport(
  expiresAt: Timestamp,
  maxExpiresAt: Timestamp,
  extensionWindow: number,
  now: Date = new Date()
): boolean {
  if (isReportExpired(expiresAt, now)) {
    return false;
  }

  if (
    isMaxExpirationReached(
      maxExpiresAt,
      now
    )
  ) {
    return false;
  }

  const remainingTime =
    getRemainingTime(expiresAt, now);

  return remainingTime <= extensionWindow;
}