import { getMessaging } from "firebase-admin/messaging";
import * as logger from "firebase-functions/logger";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

import { adminDb } from "../config/firebaseAdmin";
import {
  preferenceFor,
  shouldSendPush,
  type PushPreferences,
} from "../domain/pushNotificationPolicy";
import { notificationImageFor } from "../push/NotificationImageService";

function destinationFor(data: FirebaseFirestore.DocumentData): string {
  if (data.type === "CHAT_MESSAGE" || data.type === "CHAT_REQUEST") {
    return "/chat";
  }
  if (data.reportId) {
    return `/mappa?report=${encodeURIComponent(String(data.reportId))}`;
  }
  return "/chat";
}

async function reportImageFor(
  data: FirebaseFirestore.DocumentData
): Promise<{ url: string; bytes: number } | undefined> {
  const reportId = data.reportId;
  if (typeof reportId !== "string" || !reportId) return undefined;

  try {
    const snapshot = await adminDb.collection("reports").doc(reportId).get();
    const report = snapshot.data();
    if (!report || report.isVisible !== true || !Array.isArray(report.images)) {
      return undefined;
    }

    const image = report.images.find(
      (image: unknown) =>
        image &&
        typeof image === "object" &&
        typeof (image as { storagePath?: unknown }).storagePath === "string"
    );

    return image && typeof image === "object"
      ? notificationImageFor(reportId, image)
      : undefined;
  } catch (error) {
    logger.warn("Impossibile recuperare la foto per la notifica push", {
      notificationId: data.id ?? null,
      error: error instanceof Error ? error.message : "unknown",
    });
    return undefined;
  }
}

export const userNotificationCreatedTrigger = onDocumentCreated(
  {
    document: "userNotifications/{notificationId}",
    region: "europe-west1",
    memory: "512MiB",
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
    const configured = userSnapshot.data()?.preferences
      ?.pushNotifications as PushPreferences | undefined;
    const enabled = shouldSendPush(data, configured);
    logger.info("Valutazione notifica push", {
      notificationId: event.params.notificationId,
      type: data.type ?? null,
      eventKind: data.eventKind ?? null,
      preference,
      enabled,
      activeSubscriptions: subscriptions.size,
      municipalUpdatesEnabled: configured?.municipalUpdates !== false,
    });
    if (!enabled || subscriptions.empty) return;

    const tokenDocuments = subscriptions.docs.filter(
      (document) => typeof document.data().token === "string"
    );
    const tokens = tokenDocuments.map(
      (document) => String(document.data().token)
    );
    if (tokens.length === 0) return;

    const image = await reportImageFor(data);
    const body = String(
      data.pushMessage ?? data.message ?? "Hai un nuovo aggiornamento."
    ).slice(0, 180);
    const destination = destinationFor(data);
    const notificationIcon = image
      ? image.url
      : "https://www.commety.it/commety-marker.png";
    const response = await getMessaging().sendEachForMulticast({
      tokens: tokens.slice(0, 500),
      data: {
        title: "Commety",
        body,
        url: destination,
        icon: notificationIcon,
        badge: "/commety-marker.png",
        ...(image
          ? {
              image: image.url,
              reportImage: image.url,
            }
          : {}),
        tag: String(event.params.notificationId),
      },
      webpush: {
        headers: {
          Urgency: preference === "messages" ? "high" : "normal",
          ...(image ? { image: image.url } : {}),
        },
        notification: {
          title: "Commety",
          body,
          icon: notificationIcon,
          badge: "https://www.commety.it/commety-marker.png",
          tag: String(event.params.notificationId),
          ...(image
            ? {
                image: image.url,
                data: { reportImage: image.url },
              }
            : {}),
        },
        fcmOptions: {
          link: `https://www.commety.it${destination}`,
        },
      },
    });
    logger.info("Esito invio notifica push", {
      notificationId: event.params.notificationId,
      successCount: response.successCount,
      failureCount: response.failureCount,
      imageAttached: Boolean(image),
      imageBytes: image?.bytes ?? 0,
      errorCodes: response.responses
        .filter((result) => !result.success)
        .map((result) => result.error?.code ?? "unknown"),
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
