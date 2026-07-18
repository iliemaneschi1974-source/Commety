import {
  doc,
  getDoc,
  increment,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getReliabilityProfile } from "@/lib/reliability";
import { getReputationProgress, XP } from "@/lib/reputation";

import { UserDocument } from "@/types/firestore-user";

/**
 * Aggiorna XP e livello.
 */
async function addXp(
  uid: string,
  amount: number
) {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return;
  }

  const user =
    snapshot.data() as UserDocument;

  const currentXp =
    user.reputation?.xp ?? 0;

  const newXp =
    currentXp + amount;

  const newLevel =
    getReputationProgress(newXp).level;

  await updateDoc(userRef, {
    "reputation.xp": increment(amount),

    "reputation.level": newLevel,

    "metadata.updatedAt":
      serverTimestamp(),
  });
}

/**
 * Premio per una nuova segnalazione.
 */
export async function rewardReportCreation(
  uid: string,
  photosCount: number
) {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    "statistics.reports": increment(1),

    "statistics.photos":
      increment(photosCount),

    "metadata.updatedAt":
      serverTimestamp(),
  });

  await addXp(
    uid,
    XP.REPORT_CREATED +
      photosCount * XP.PHOTO_UPLOADED
  );
}

/**
 * Premio per un commento.
 */
export async function rewardComment(
  uid: string
) {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    "statistics.comments": increment(1),

    "metadata.updatedAt":
      serverTimestamp(),
  });

  await addXp(uid, XP.COMMENT_CREATED);
}

/**
 * Incrementa il numero di conferme ricevute.
 *
 * Non assegna XP.
 * Le conferme contribuiranno allo Score
 * (Sprint 17).
 */
export async function incrementReceivedConfirmations(
  uid: string
) {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    "statistics.confirmations":
      increment(1),

    "metadata.updatedAt":
      serverTimestamp(),
  });
}

/** Aggiorna l'affidabilit\u00e0 dell'autore di una segnalazione. */
export async function adjustReliabilityScore(
  uid: string,
  amount: number
) {
  const userRef = doc(db, "users", uid);
  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(userRef);

    if (!snapshot.exists()) {
      return;
    }

    const user = snapshot.data() as UserDocument;
    const reliability = getReliabilityProfile(
      (user.reputation?.score ?? 0) + amount
    );

    transaction.update(userRef, {
      "reputation.score": reliability.score,
      "reputation.verified": reliability.verified,
      "metadata.updatedAt": serverTimestamp(),
    });
  });
}
