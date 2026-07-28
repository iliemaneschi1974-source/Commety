import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import { db, functions } from "@/lib/firebase";
import { getCurrentUser } from "@/services/auth";
import { getDeviceId, getReportOwnerKey } from "@/services/device";
import { Report } from "@/types/report";

function getConfirmationId() {
  return getCurrentUser()?.uid ?? getDeviceId();
}

export async function hasConfirmed(
  reportId: string
): Promise<boolean> {
  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    getConfirmationId()
  );
  const snapshot = await getDoc(confirmationRef);
  return snapshot.exists();
}

export function subscribeConfirmation(
  reportId: string,
  callback: (confirmed: boolean) => void
) {
  const confirmationRef = doc(
    db,
    "reports",
    reportId,
    "confirmations",
    getConfirmationId()
  );

  return onSnapshot(
    confirmationRef,
    (snapshot) => {
      callback(snapshot.exists());
    },
    (error) => {
      console.error("Impossibile leggere la conferma:", error);
      callback(false);
    }
  );
}

export async function toggleConfirmation(
  reportId: string
): Promise<boolean> {
  const ownerKey = await getReportOwnerKey(reportId);
  const action = httpsCallable<
    {
      action: "TOGGLE_CONFIRMATION";
      reportId: string;
      deviceId: string;
      ownerKey: string;
    },
    { confirmed: boolean }
  >(functions, "communityAction");
  const result = await action({
    action: "TOGGLE_CONFIRMATION",
    reportId,
    deviceId: getDeviceId(),
    ownerKey,
  });

  return result.data.confirmed;
}

export async function deleteReportConfirmations(
  reportId: string
): Promise<void> {
  const confirmationsCollection = collection(
    db,
    "reports",
    reportId,
    "confirmations"
  );
  const snapshot = await getDocs(confirmationsCollection);

  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach((confirmation) => {
    batch.delete(confirmation.ref);
  });
  await batch.commit();
}

export async function isReportOwner(
  report: Pick<
    Report,
    "id" | "userId" | "authorConfirmationKey"
  >
): Promise<boolean> {
  const firebaseUser = getCurrentUser();

  if (report.userId && report.userId === firebaseUser?.uid) {
    return true;
  }
  if (!report.authorConfirmationKey) {
    return false;
  }

  return (
    report.authorConfirmationKey ===
    await getReportOwnerKey(report.id)
  );
}
