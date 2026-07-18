import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
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
