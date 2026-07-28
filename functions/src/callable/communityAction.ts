import {FieldValue} from "firebase-admin/firestore";
import {HttpsError, onCall} from "firebase-functions/v2/https";

import {adminDb} from "../config/firebaseAdmin";

const ENDED_REPORT_VOTES_REQUIRED = 3;
const REPORT_ID_PATTERN = /^[A-Za-z0-9_-]{1,160}$/;
const DEVICE_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const OWNER_KEY_PATTERN = /^[0-9a-f]{64}$/i;
const HOUR = 60 * 60 * 1000;
const EXTENSION_POLICY: Record<
  string,
  {duration: number; window: number}
> = {
  traffico: {duration: HOUR, window: 30 * 60 * 1000},
  meteo: {duration: HOUR, window: 30 * 60 * 1000},
  pericolo: {duration: 6 * HOUR, window: 2 * HOUR},
  mare: {duration: 6 * HOUR, window: 2 * HOUR},
  evento: {duration: 12 * HOUR, window: 4 * HOUR},
  animali: {duration: 12 * HOUR, window: 4 * HOUR},
  rete: {duration: 2 * HOUR, window: HOUR},
  trasporti: {duration: 2 * HOUR, window: HOUR},
  accessibilita: {duration: 12 * HOUR, window: 4 * HOUR},
};

type CommunityAction =
  | "TOGGLE_CONFIRMATION"
  | "SUBMIT_STATUS_VOTE";
type StatusVote = "ACTIVE" | "ENDED";

interface CommunityActionData {
  action?: CommunityAction;
  reportId?: string;
  deviceId?: string;
  ownerKey?: string;
  vote?: StatusVote;
}

function activityUpdates(
  report: FirebaseFirestore.DocumentData
): FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData> {
  const expiresAt = report.expiresAt;
  const maxExpiresAt = report.maxExpiresAt;
  const policy = EXTENSION_POLICY[String(report.type)];

  if (
    report.status !== "ACTIVE" ||
    !policy ||
    typeof expiresAt?.toMillis !== "function" ||
    typeof maxExpiresAt?.toMillis !== "function"
  ) {
    return {};
  }

  const now = Date.now();
  const expiration = expiresAt.toMillis();
  const maximum = maxExpiresAt.toMillis();
  if (
    expiration <= now ||
    expiration - now > policy.window ||
    expiration >= maximum
  ) {
    return {};
  }

  return {
    expiresAt: new Date(
      Math.min(expiration + policy.duration, maximum)
    ),
    lastActivityAt: FieldValue.serverTimestamp(),
  };
}

function requireString(
  value: unknown,
  pattern: RegExp,
  message: string
): string {
  if (typeof value !== "string" || !pattern.test(value)) {
    throw new HttpsError("invalid-argument", message);
  }
  return value;
}

async function updateAuthorReputation(
  authorId: string,
  delta: number,
  incrementConfirmations: boolean
): Promise<void> {
  const userRef = adminDb.collection("users").doc(authorId);

  await adminDb.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(userRef);
    if (!snapshot.exists) return;

    const user = snapshot.data() ?? {};
    const currentScore = Number(user.reputation?.score ?? 0);
    const score = Math.min(100, Math.max(0, currentScore + delta));

    transaction.update(userRef, {
      "reputation.score": score,
      "reputation.verified": score >= 40,
      ...(incrementConfirmations ?
        {"statistics.confirmations": FieldValue.increment(1)} :
        {}),
      "metadata.updatedAt": FieldValue.serverTimestamp(),
    });
  });
}

async function toggleConfirmation(
  reportId: string,
  actorId: string,
  uid: string | undefined,
  deviceId: string,
  ownerKey: string
): Promise<{confirmed: boolean}> {
  const reportRef = adminDb.collection("reports").doc(reportId);
  const confirmationRef = reportRef
    .collection("confirmations")
    .doc(actorId);

  const result = await adminDb.runTransaction(async (transaction) => {
    const reportSnapshot = await transaction.get(reportRef);
    if (!reportSnapshot.exists) {
      throw new HttpsError("not-found", "Segnalazione non trovata.");
    }

    const report = reportSnapshot.data() ?? {};
    const isOwner =
      (Boolean(uid) && report.userId === uid) ||
      report.authorConfirmationKey === ownerKey;

    if (isOwner) {
      throw new HttpsError(
        "permission-denied",
        "Non puoi confermare una segnalazione creata da te."
      );
    }

    const confirmationSnapshot =
      await transaction.get(confirmationRef);
    const current = Number(report.confirmations ?? 0);

    if (confirmationSnapshot.exists) {
      transaction.delete(confirmationRef);
      transaction.update(reportRef, {
        confirmations: Math.max(0, current - 1),
        updatedAt: FieldValue.serverTimestamp(),
      });
      return {
        confirmed: false,
        authorId: report.userId as string | undefined,
      };
    }

    transaction.set(confirmationRef, {
      deviceId,
      userId: uid ?? null,
      createdAt: FieldValue.serverTimestamp(),
    });
    transaction.update(reportRef, {
      confirmations: current + 1,
      ...activityUpdates(report),
      updatedAt: FieldValue.serverTimestamp(),
    });
    return {
      confirmed: true,
      authorId: report.userId as string | undefined,
    };
  });

  if (result.authorId && result.authorId !== uid) {
    try {
      await updateAuthorReputation(
        result.authorId,
        result.confirmed ? 2 : -2,
        result.confirmed
      );
    } catch (error) {
      console.error(
        "Impossibile aggiornare la reputazione dopo la conferma:",
        error
      );
    }
  }

  return {confirmed: result.confirmed};
}

async function submitStatusVote(
  reportId: string,
  actorId: string,
  uid: string | undefined,
  deviceId: string,
  ownerKey: string,
  vote: StatusVote
): Promise<{closed: boolean; vote: StatusVote}> {
  const reportRef = adminDb.collection("reports").doc(reportId);
  const voteRef = reportRef.collection("statusVotes").doc(actorId);

  const result = await adminDb.runTransaction(async (transaction) => {
    const reportSnapshot = await transaction.get(reportRef);
    if (!reportSnapshot.exists) {
      throw new HttpsError("not-found", "Segnalazione non trovata.");
    }

    const report = reportSnapshot.data() ?? {};
    const isOwner =
      (Boolean(uid) && report.userId === uid) ||
      report.authorConfirmationKey === ownerKey;

    if (isOwner) {
      throw new HttpsError(
        "permission-denied",
        "Non puoi aggiornare una segnalazione creata da te."
      );
    }
    if (report.status !== "ACTIVE") {
      throw new HttpsError(
        "failed-precondition",
        "Questa segnalazione non è più attiva."
      );
    }

    const previousSnapshot = await transaction.get(voteRef);
    const previous = previousSnapshot.data()?.vote as
      | StatusVote
      | undefined;
    const changed = previous !== vote;
    let activeVotes = Number(report.activeStatusVotes ?? 0);
    let endedVotes = Number(report.endedStatusVotes ?? 0);

    if (previous === "ACTIVE") {
      activeVotes = Math.max(0, activeVotes - 1);
    }
    if (previous === "ENDED") {
      endedVotes = Math.max(0, endedVotes - 1);
    }
    if (vote === "ACTIVE") activeVotes += 1;
    if (vote === "ENDED") endedVotes += 1;

    const closed = endedVotes >= ENDED_REPORT_VOTES_REQUIRED;
    transaction.set(voteRef, {
      vote,
      deviceId,
      userId: uid ?? null,
      updatedAt: FieldValue.serverTimestamp(),
    });
    transaction.update(reportRef, {
      activeStatusVotes: activeVotes,
      endedStatusVotes: endedVotes,
      ...(vote === "ACTIVE" && changed ?
        activityUpdates(report) :
        {}),
      ...(closed ?
        {status: "RESOLVED", resolvedReason: "COMMUNITY_ENDED"} :
        {}),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return {closed};
  });

  return {closed: result.closed, vote};
}

export const communityAction = onCall(
  {region: "europe-west1"},
  async (request) => {
    const data = request.data as CommunityActionData;
    const reportId = requireString(
      data.reportId,
      REPORT_ID_PATTERN,
      "Segnalazione non valida."
    );
    const deviceId = requireString(
      data.deviceId,
      DEVICE_ID_PATTERN,
      "Dispositivo non valido."
    );
    const ownerKey = requireString(
      data.ownerKey,
      OWNER_KEY_PATTERN,
      "Identificativo autore non valido."
    );
    const uid = request.auth?.uid;
    const actorId = uid ?? deviceId;

    if (data.action === "TOGGLE_CONFIRMATION") {
      return toggleConfirmation(
        reportId,
        actorId,
        uid,
        deviceId,
        ownerKey
      );
    }
    if (
      data.action === "SUBMIT_STATUS_VOTE" &&
      (data.vote === "ACTIVE" || data.vote === "ENDED")
    ) {
      return submitStatusVote(
        reportId,
        actorId,
        uid,
        deviceId,
        ownerKey,
        data.vote
      );
    }

    throw new HttpsError("invalid-argument", "Azione non valida.");
  }
);
