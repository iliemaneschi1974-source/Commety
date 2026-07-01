import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  runTransaction,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { getDeviceId } from "@/services/device";
import { rewardComment } from "@/services/reputation";

import {
  Comment,
  CreateCommentInput,
} from "@/types/comment";

/**
 * Crea un nuovo commento.
 */
export async function createComment(
  input: CreateCommentInput
) {
  const reportRef = doc(db, "reports", input.reportId);

  const commentsCollection = collection(
    db,
    "reports",
    input.reportId,
    "comments"
  );

  await runTransaction(db, async (transaction) => {
    const reportSnapshot = await transaction.get(reportRef);

    if (!reportSnapshot.exists()) {
      throw new Error("Report non trovato.");
    }

    const currentComments =
      (reportSnapshot.data().commentsCount as number) ?? 0;

    const commentRef = doc(commentsCollection);

    transaction.set(commentRef, {
      reportId: input.reportId,

      text: input.text,

      deviceId: getDeviceId(),

      userId: input.userId ?? null,
      username: input.username ?? null,
      displayName: input.displayName ?? null,
      avatarUrl: input.avatarUrl ?? null,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    transaction.update(reportRef, {
      commentsCount: currentComments + 1,
      updatedAt: serverTimestamp(),
    });
  });

  if (input.userId) {
    await rewardComment(input.userId);
  }
}

/**
 * Listener realtime dei commenti.
 */
export function listenComments(
  reportId: string,
  callback: (comments: Comment[]) => void
) {
  const commentsCollection = collection(
    db,
    "reports",
    reportId,
    "comments"
  );

  const q = query(
    commentsCollection,
    orderBy("createdAt", "asc")
  );

  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const comments: Comment[] = snapshot.docs.map(
        (document) => ({
          id: document.id,
          ...(document.data() as Omit<Comment, "id">),
        })
      );

      callback(comments);
    },
    (error) => {
      console.error(
        "Errore listener commenti:",
        error
      );
    }
  );
}

/**
 * Elimina un commento.
 */
export async function deleteComment(
  reportId: string,
  commentId: string
) {
  const reportRef = doc(db, "reports", reportId);

  const commentRef = doc(
    db,
    "reports",
    reportId,
    "comments",
    commentId
  );

  await runTransaction(db, async (transaction) => {
    const reportSnapshot = await transaction.get(reportRef);

    if (!reportSnapshot.exists()) {
      throw new Error("Report non trovato.");
    }

    const currentComments =
      (reportSnapshot.data().commentsCount as number) ?? 0;

    transaction.delete(commentRef);

    transaction.update(reportRef, {
      commentsCount: Math.max(
        0,
        currentComments - 1
      ),
      updatedAt: serverTimestamp(),
    });
  });
}

/**
 * Elimina tutti i commenti di una segnalazione.
 *
 * Utilizzata esclusivamente dal Lifecycle Engine
 * durante il cleanup della segnalazione.
 */
export async function deleteReportComments(
  reportId: string
): Promise<void> {
  const commentsCollection = collection(
    db,
    "reports",
    reportId,
    "comments"
  );

  const snapshot = await getDocs(commentsCollection);

  if (snapshot.empty) {
    return;
  }

  const batch = writeBatch(db);

  snapshot.docs.forEach((comment) => {
    batch.delete(comment.ref);
  });

  await batch.commit();
}