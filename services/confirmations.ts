import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

import { getCurrentUser } from "@/services/auth";
import { getDeviceId } from "@/services/device";
import { registerReportActivity } from "@/services/reportLifecycle";
import {
  adjustReliabilityScore,
  incrementReceivedConfirmations,
} from "@/services/reputation";

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

  const result = await runTransaction(
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

        return {
          created: false,
          reportOwnerId: reportData.userId as string | undefined,
        };
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

      return {
        created: true,
        reportOwnerId: reportData.userId as string | undefined,
      };
    }
  );

  const isEligibleForReliability =
    Boolean(firebaseUser?.uid) &&
    Boolean(result.reportOwnerId) &&
    firebaseUser?.uid !== result.reportOwnerId;

  if (isEligibleForReliability && result.reportOwnerId) {
    await adjustReliabilityScore(
      result.reportOwnerId,
      result.created ? 2 : -2
    );
  }

  if (!result.created) {
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

  await registerReportActivity(
    reportId,
    "confirmation"
  );

  return true;
}

/**
 * Elimina tutte le conferme di una segnalazione.
 *
 * Utilizzata esclusivamente dal Lifecycle Engine
 * durante il cleanup della segnalazione.
 */
export async function deleteReportConfirmations(
  reportId: string
): Promise<void> {
  const confirmationsCollection = collection(
    db,
    "reports",
    reportId,
    "confirmations"
  );

  const snapshot = await getDocs(
    confirmationsCollection
  );

  if (snapshot.empty) {
    return;
  }

  const batch = writeBatch(db);

  snapshot.docs.forEach((confirmation) => {
    batch.delete(confirmation.ref);
  });

  await batch.commit();
}
