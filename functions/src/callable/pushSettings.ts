import { createHash } from "node:crypto";

import { FieldValue } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { adminDb } from "../config/firebaseAdmin";

type Preferences = {
  municipalUpdates: boolean;
  statusChanges: boolean;
  messages: boolean;
  verificationRequests: boolean;
  nearbyReports: boolean;
};

function requireDeviceId(value: unknown): string {
  if (typeof value !== "string" || !/^[A-Za-z0-9-]{16,80}$/.test(value)) {
    throw new HttpsError("invalid-argument", "Dispositivo non valido.");
  }
  return value;
}

function asPreferences(value: unknown): Preferences {
  const candidate = value && typeof value === "object"
    ? value as Partial<Preferences>
    : {};
  return {
    municipalUpdates: candidate.municipalUpdates !== false,
    statusChanges: candidate.statusChanges !== false,
    messages: candidate.messages !== false,
    verificationRequests: candidate.verificationRequests !== false,
    nearbyReports: candidate.nearbyReports === true,
  };
}

function subscriptionId(uid: string, deviceId: string): string {
  return createHash("sha256").update(`${uid}:${deviceId}`).digest("hex");
}

export const pushSettings = onCall(
  { region: "europe-west1" },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError(
        "unauthenticated",
        "Accedi per gestire le notifiche."
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists || userSnapshot.data()?.status !== "ACTIVE") {
      throw new HttpsError(
        "permission-denied",
        "Questo account non può usare le notifiche."
      );
    }

    const action = request.data?.action;
    const deviceId = requireDeviceId(request.data?.deviceId);
    const subscriptionRef = adminDb
      .collection("pushSubscriptions")
      .doc(subscriptionId(uid, deviceId));
    const storedPreferences = asPreferences(
      userSnapshot.data()?.preferences?.pushNotifications
    );

    if (action === "state") {
      const subscription = await subscriptionRef.get();
      return {
        preferences: storedPreferences,
        deviceEnabled:
          subscription.exists && subscription.data()?.enabled === true,
      };
    }

    if (action === "enable") {
      const token = request.data?.token;
      if (typeof token !== "string" || token.length < 40 || token.length > 4096) {
        throw new HttpsError("invalid-argument", "Token push non valido.");
      }
      await subscriptionRef.set({
        userId: uid,
        deviceId,
        token,
        enabled: true,
        updatedAt: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(),
      }, { merge: true });
      return { preferences: storedPreferences, deviceEnabled: true };
    }

    if (action === "disable") {
      await subscriptionRef.delete();
      return { preferences: storedPreferences, deviceEnabled: false };
    }

    if (action === "preferences") {
      const preferences = asPreferences(request.data?.preferences);
      await userRef.set({
        preferences: {
          pushNotifications: preferences,
        },
        metadata: {
          updatedAt: FieldValue.serverTimestamp(),
        },
      }, { merge: true });
      const subscription = await subscriptionRef.get();
      return {
        preferences,
        deviceEnabled:
          subscription.exists && subscription.data()?.enabled === true,
      };
    }

    throw new HttpsError(
      "invalid-argument",
      "Azione notifiche non valida."
    );
  }
);
