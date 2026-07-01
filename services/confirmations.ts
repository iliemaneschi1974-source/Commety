import {
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { getCurrentUser } from "@/services/auth";
import { getDeviceId } from "@/services/device";
import { incrementReceivedConfirmations } from "@/services/reputation";

/**
 * Restituisce l'identificativo della conferma.
 * - Utente autenticato -> UID
 * - Utente anonimo -> Device ID
 */
function getConfirmationId() {
  const firebaseUser = getCurrentUser();

  return firebaseUser?.uid ?? getDeviceId();
}

/**
 * Verifica se l'utente/dispositivo ha già confermato.
 */
export async function hasConfirmed(
  reportId: string
): Promise<boolean> {
  const confirmationId = getConfirmationId();

  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    confirmationId
  );

  const snapshot = await getDoc(confirmationRef);

  return snapshot.exists();
}

/**
 * Listener realtime della conferma.
 */
export function subscribeConfirmation(
  reportId: string,
  callback: (confirmed: boolean) => void
) {
  const confirmationId = getConfirmationId();

  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    confirmationId
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
  const firebaseUser = getCurrentUser();

  const confirmationId =
    firebaseUser?.uid ?? getDeviceId();

  const reportRef = doc(db, "reports", reportId);

  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    confirmationId
  );

  const created = await runTransaction(
    db,
    async (transaction) => {
      const reportSnapshot =
        await transaction.get(reportRef);

      if (!reportSnapshot.exists()) {
        throw new Error("Report non trovato.");
      }

      const reportData = reportSnapshot.data();

      const confirmationSnapshot =
        await transaction.get(confirmationRef);

      const current =
        (reportData.confirmations as number) ?? 0;

      if (confirmationSnapshot.exists()) {
        transaction.delete(confirmationRef);

        transaction.update(reportRef, {
          confirmations: Math.max(
            0,
            current - 1
          ),
        });

        return false;
      }

      transaction.set(confirmationRef, {
        deviceId: getDeviceId(),

        userId: firebaseUser?.uid ?? null,

        displayName:
          firebaseUser?.displayName ?? null,

        avatarUrl:
          firebaseUser?.photoURL ?? null,

        createdAt: serverTimestamp(),
      });

      transaction.update(reportRef, {
        confirmations: current + 1,
      });

      return true;
    }
  );

  if (!created) {
    return false;
  }

  const reportSnapshot = await getDoc(reportRef);

  if (!reportSnapshot.exists()) {
    return true;
  }

  const report = reportSnapshot.data();

  if (report.userId) {
    await incrementReceivedConfirmations(
      report.userId
    );
  }

  return true;
}