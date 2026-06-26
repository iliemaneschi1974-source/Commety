import {
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getDeviceId } from "@/services/device";

/**
 * Verifica se il dispositivo ha già confermato.
 */
export async function hasConfirmed(
  reportId: string
): Promise<boolean> {
  const deviceId = getDeviceId();

  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    deviceId
  );

  const snapshot = await getDoc(confirmationRef);

  return snapshot.exists();
}

/**
 * Listener realtime della conferma del dispositivo.
 */
export function subscribeConfirmation(
  reportId: string,
  callback: (confirmed: boolean) => void
) {
  const deviceId = getDeviceId();

  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    deviceId
  );

  return onSnapshot(confirmationRef, (snapshot) => {
    callback(snapshot.exists());
  });
}

/**
 * Aggiunge o rimuove una conferma.
 */
export async function toggleConfirmation(
  reportId: string
): Promise<boolean> {
  const deviceId = getDeviceId();

  const reportRef = doc(db, "reports", reportId);

  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    deviceId
  );

  return runTransaction(db, async (transaction) => {
    const reportSnapshot = await transaction.get(reportRef);

    if (!reportSnapshot.exists()) {
      throw new Error("Report non trovato.");
    }

    const confirmationSnapshot =
      await transaction.get(confirmationRef);

    const current =
      (reportSnapshot.data().confirmations as number) ?? 0;

    if (confirmationSnapshot.exists()) {
      transaction.delete(confirmationRef);

      transaction.update(reportRef, {
        confirmations: Math.max(0, current - 1),
      });

      return false;
    }

    transaction.set(confirmationRef, {
      deviceId,
      createdAt: serverTimestamp(),
    });

    transaction.update(reportRef, {
      confirmations: current + 1,
    });

    return true;
  });
}