import { getMessaging } from "firebase-admin/messaging";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

import { adminDb } from "../config/firebaseAdmin";

type PushPreference =
  | "municipalUpdates"
  | "statusChanges"
  | "messages"
  | "verificationRequests"
  | "nearbyReports";

function preferenceFor(data: FirebaseFirestore.DocumentData): PushPreference {
  if (data.type === "CHAT_MESSAGE" || data.type === "CHAT_REQUEST") {
    return "messages";
  }
  if (data.type === "VERIFICATION_REQUEST") return "verificationRequests";
  if (data.type === "NEARBY_REPORT") return "nearbyReports";
  if (data.eventKind === "STATUS" || data.eventKind === "STATUS_AND_NOTE") {
    return "statusChanges";
  }
  return "municipalUpdates";
}

function destinationFor(data: FirebaseFirestore.DocumentData): string {
  if (data.type === "CHAT_MESSAGE" || data.type === "CHAT_REQUEST") {
    return "/chat";
  }
  if (data.reportId) {
    return `/mappa?report=${encodeURIComponent(String(data.reportId))}`;
  }
  return "/chat";
}

export const userNotificationCreatedTrigger = onDocumentCreated(
  {
    document: "userNotifications/{notificationId}",
    region: "europe-west1",
  },
  async (event) => {
    const data = event.data?.data();
    const userId = data?.userId;
    if (!data || typeof userId !== "string" || !userId) return;

    const [userSnapshot, subscriptions] = await Promise.all([
      adminDb.collection("users").doc(userId).get(),
      adminDb
        .collection("pushSubscriptions")
        .where("userId", "==", userId)
        .where("enabled", "==", true)
        .get(),
    ]);

    const preference = preferenceFor(data);
    const configured = userSnapshot.data()?.preferences?.pushNotifications;
    const enabled = data.eventKind === "STATUS_AND_NOTE"
      ? configured?.statusChanges !== false ||
        configured?.municipalUpdates !== false
      : preference === "nearbyReports"
        ? configured?.nearbyReports === true
        : configured?.[preference] !== false;
    if (!enabled || subscriptions.empty) return;

    const tokenDocuments = subscriptions.docs.filter(
      (document) => typeof document.data().token === "string"
    );
    const tokens = tokenDocuments.map(
      (document) => String(document.data().token)
    );
    if (tokens.length === 0) return;

    const response = await getMessaging().sendEachForMulticast({
      tokens: tokens.slice(0, 500),
      data: {
        title: "Commety",
        body: String(data.pushMessage ?? data.message ?? "Hai un nuovo aggiornamento.")
          .slice(0, 180),
        url: destinationFor(data),
        icon: "/logo.png",
        badge: "/logo.png",
        tag: String(event.params.notificationId),
      },
      webpush: {
        headers: { Urgency: preference === "messages" ? "high" : "normal" },
      },
    });

    const invalidCodes = new Set([
      "messaging/invalid-registration-token",
      "messaging/registration-token-not-registered",
    ]);
    const writer = adminDb.bulkWriter();
    let hasDeletes = false;
    response.responses.forEach((result, index) => {
      if (!result.success && invalidCodes.has(result.error?.code ?? "")) {
        writer.delete(tokenDocuments[index].ref);
        hasDeletes = true;
      }
    });
    if (hasDeletes) await writer.close();
  }
);
