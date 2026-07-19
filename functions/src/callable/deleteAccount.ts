import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { adminDb } from "../config/firebaseAdmin";

async function deleteCollectionGroupEntries(
  collectionId: string,
  userId: string
): Promise<void> {
  const snapshot = await adminDb
    .collectionGroup(collectionId)
    .where("userId", "==", userId)
    .get();

  const writer = adminDb.bulkWriter();

  snapshot.docs.forEach((document) => writer.delete(document.ref));

  await writer.close();
}

export const deleteAccount = onCall(
  { region: "europe-west1" },
  async (request) => {
    const userId = request.auth?.uid;

    if (!userId) {
      throw new HttpsError(
        "unauthenticated",
        "Devi effettuare l'accesso per cancellare l'account."
      );
    }

    const reports = await adminDb
      .collection("reports")
      .where("userId", "==", userId)
      .get();

    const bucket = getStorage().bucket();

    await Promise.all(
      reports.docs.map(async (report) => {
        await Promise.all([
          adminDb.recursiveDelete(report.ref),
          bucket.deleteFiles({ prefix: `reports/${report.id}/` }),
        ]);
      })
    );

    await Promise.all([
      deleteCollectionGroupEntries("comments", userId),
      deleteCollectionGroupEntries("confirmations", userId),
    ]);

    await adminDb.collection("users").doc(userId).delete();
    await getAuth().deleteUser(userId);

    return { deleted: true };
  }
);
