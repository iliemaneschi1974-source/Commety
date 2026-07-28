import { Timestamp } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { adminDb } from "../config/firebaseAdmin";

const NOTIFICATION_LIMIT = 100;

function asIso(value: unknown): string | undefined {
  return value instanceof Timestamp
    ? value.toDate().toISOString()
    : undefined;
}

async function requireActiveUser(uid: string) {
  const snapshot = await adminDb.collection("users").doc(uid).get();
  if (!snapshot.exists || snapshot.data()?.status !== "ACTIVE") {
    throw new HttpsError(
      "permission-denied",
      "Questo account non può usare gli aggiornamenti."
    );
  }
}

export const notifications = onCall(
  {region: "europe-west1"},
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError(
        "unauthenticated",
        "Accedi per visualizzare gli aggiornamenti."
      );
    }
    await requireActiveUser(uid);

    const action = request.data?.action;
    if (action === "inbox") {
      const snapshot = await adminDb
        .collection("userNotifications")
        .where("userId", "==", uid)
        .limit(NOTIFICATION_LIMIT)
        .get();

      const items = snapshot.docs
        .map((document) => {
          const data = document.data();
          return {
            id: document.id,
            type: "MUNICIPAL_UPDATE" as const,
            reportId: String(data.reportId ?? ""),
            reportTitle: String(
              data.reportTitle ?? "Segnalazione Commety"
            ),
            municipalityName: String(
              data.municipalityName ?? "Comune"
            ),
            status:
              typeof data.status === "string"
                ? data.status
                : undefined,
            message: String(data.message ?? ""),
            institutionalNote:
              typeof data.institutionalNote === "string"
                ? data.institutionalNote
                : undefined,
            createdAt: asIso(data.createdAt) ?? new Date(0).toISOString(),
            readAt: asIso(data.readAt),
          };
        })
        .sort(
          (first, second) =>
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime()
        );

      return {
        notifications: items,
        unreadCount: items.filter((item) => !item.readAt).length,
      };
    }

    if (action === "markRead") {
      const notificationId = request.data?.notificationId;
      if (
        typeof notificationId !== "string" ||
        !/^[A-Za-z0-9_-]{1,160}$/.test(notificationId)
      ) {
        throw new HttpsError(
          "invalid-argument",
          "Aggiornamento non valido."
        );
      }

      const reference = adminDb
        .collection("userNotifications")
        .doc(notificationId);
      await adminDb.runTransaction(async (transaction) => {
        const snapshot = await transaction.get(reference);
        if (!snapshot.exists || snapshot.data()?.userId !== uid) {
          throw new HttpsError(
            "not-found",
            "Aggiornamento non disponibile."
          );
        }
        transaction.update(reference, {
          readAt: Timestamp.now(),
        });
      });
      return {success: true};
    }

    if (action === "markAllRead") {
      const snapshot = await adminDb
        .collection("userNotifications")
        .where("userId", "==", uid)
        .limit(NOTIFICATION_LIMIT)
        .get();
      const batch = adminDb.batch();
      snapshot.docs.forEach((document) => {
        if (!document.data().readAt) {
          batch.update(document.ref, {readAt: Timestamp.now()});
        }
      });
      await batch.commit();
      return {success: true};
    }

    throw new HttpsError(
      "invalid-argument",
      "Azione aggiornamenti non valida."
    );
  }
);
