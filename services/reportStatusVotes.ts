import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getCurrentUser } from "@/services/auth";
import { getDeviceId, getReportOwnerKey } from "@/services/device";
import { registerReportActivity } from "@/services/reportLifecycle";

export type ReportStatusVote = "ACTIVE" | "ENDED";

export const ENDED_REPORT_VOTES_REQUIRED = 3;

function getStatusVoteId() {
  return getCurrentUser()?.uid ?? getDeviceId();
}

export function subscribeReportStatusVote(
  reportId: string,
  callback: (vote: ReportStatusVote | null) => void
) {
  const voteRef = doc(
    db,
    "reports",
    reportId,
    "statusVotes",
    getStatusVoteId()
  );

  return onSnapshot(voteRef, (snapshot) => {
    const value = snapshot.data()?.vote;
    callback(value === "ACTIVE" || value === "ENDED" ? value : null);
  });
}

/**
 * Registra la risposta sulla validità attuale della segnalazione.
 * Al terzo "non più in corso" la segnalazione viene chiusa dalla community.
 */
export async function submitReportStatusVote(
  reportId: string,
  vote: ReportStatusVote
): Promise<{ closed: boolean }> {
  const firebaseUser = getCurrentUser();
  const voterId = getStatusVoteId();
  const ownerKey = await getReportOwnerKey(reportId);
  const reportRef = doc(db, "reports", reportId);
  const voteRef = doc(reportRef, "statusVotes", voterId);

  const result = await runTransaction(db, async (transaction) => {
    const reportSnapshot = await transaction.get(reportRef);

    if (!reportSnapshot.exists()) {
      throw new Error("Segnalazione non trovata.");
    }

    const report = reportSnapshot.data();
    const isOwner =
      report.userId === firebaseUser?.uid ||
      report.authorConfirmationKey === ownerKey;

    if (isOwner) {
      throw new Error("Non puoi aggiornare lo stato di una segnalazione creata da te.");
    }

    if (report.status !== "ACTIVE") {
      throw new Error("Questa segnalazione non è più attiva.");
    }

    const previousSnapshot = await transaction.get(voteRef);
    const previous = previousSnapshot.data()?.vote as ReportStatusVote | undefined;

    if (previous === vote) {
      return { refreshActivity: false, closed: false };
    }

    let activeVotes = Number(report.activeStatusVotes ?? 0);
    let endedVotes = Number(report.endedStatusVotes ?? 0);

    if (previous === "ACTIVE") activeVotes = Math.max(0, activeVotes - 1);
    if (previous === "ENDED") endedVotes = Math.max(0, endedVotes - 1);

    if (vote === "ACTIVE") activeVotes += 1;
    if (vote === "ENDED") endedVotes += 1;

    transaction.set(voteRef, {
      vote,
      userId: firebaseUser?.uid ?? null,
      deviceId: getDeviceId(),
      updatedAt: serverTimestamp(),
    });

    transaction.update(reportRef, {
      activeStatusVotes: activeVotes,
      endedStatusVotes: endedVotes,
      ...(endedVotes >= ENDED_REPORT_VOTES_REQUIRED
        ? { status: "RESOLVED", resolvedReason: "COMMUNITY_ENDED" }
        : {}),
      updatedAt: serverTimestamp(),
    });

    return {
      refreshActivity: vote === "ACTIVE",
      closed: endedVotes >= ENDED_REPORT_VOTES_REQUIRED,
    };
  });

  if (result.refreshActivity) {
    try {
      await registerReportActivity(reportId, "confirmation");
    } catch (error) {
      console.error(
        "Impossibile aggiornare la scadenza dopo il voto sullo stato:",
        error
      );
    }
  }

  return { closed: result.closed };
}

export async function deleteReportStatusVotes(reportId: string): Promise<void> {
  const statusVotes = collection(db, "reports", reportId, "statusVotes");
  const snapshot = await getDocs(statusVotes);

  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach((statusVote) => batch.delete(statusVote.ref));
  await batch.commit();
}
