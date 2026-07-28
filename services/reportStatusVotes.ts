import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

import { db, functions } from "@/lib/firebase";
import { getCurrentUser } from "@/services/auth";
import { getDeviceId, getReportOwnerKey } from "@/services/device";

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

  return onSnapshot(
    voteRef,
    (snapshot) => {
      const value = snapshot.data()?.vote;
      callback(value === "ACTIVE" || value === "ENDED" ? value : null);
    },
    (error) => {
      console.error("Impossibile leggere il voto sullo stato:", error);
      callback(null);
    }
  );
}

/**
 * Registra la risposta sulla validità attuale della segnalazione.
 * Al terzo "non più in corso" la segnalazione viene chiusa dalla community.
 */
export async function submitReportStatusVote(
  reportId: string,
  vote: ReportStatusVote
): Promise<{ closed: boolean }> {
  const ownerKey = await getReportOwnerKey(reportId);
  const action = httpsCallable<
    {
      action: "SUBMIT_STATUS_VOTE";
      reportId: string;
      deviceId: string;
      ownerKey: string;
      vote: ReportStatusVote;
    },
    { closed: boolean; vote: ReportStatusVote }
  >(functions, "communityAction");
  const result = await action({
    action: "SUBMIT_STATUS_VOTE",
    reportId,
    deviceId: getDeviceId(),
    ownerKey,
    vote,
  });

  return { closed: result.data.closed };
}

export async function deleteReportStatusVotes(reportId: string): Promise<void> {
  const statusVotes = collection(db, "reports", reportId, "statusVotes");
  const snapshot = await getDocs(statusVotes);

  if (snapshot.empty) return;

  const batch = writeBatch(db);
  snapshot.docs.forEach((statusVote) => batch.delete(statusVote.ref));
  await batch.commit();
}
