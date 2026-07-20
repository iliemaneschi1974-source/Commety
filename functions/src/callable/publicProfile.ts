import { Timestamp } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";

import { adminDb } from "../config/firebaseAdmin";

const ALLOWED_CATEGORIES = new Set([
  "meteo",
  "traffico",
  "pericolo",
  "evento",
  "mare",
  "animali",
]);

function toIso(value: unknown): string | undefined {
  return value instanceof Timestamp
    ? value.toDate().toISOString()
    : undefined;
}

export const getPublicProfile = onCall(
  { region: "europe-west1" },
  async (request) => {
    if (!request.auth?.uid) {
      throw new HttpsError(
        "unauthenticated",
        "Accedi per visualizzare i profili Commety."
      );
    }

    const viewer = await adminDb.collection("users").doc(request.auth.uid).get();
    if (!viewer.exists || viewer.data()?.status !== "ACTIVE") {
      throw new HttpsError(
        "permission-denied",
        "Questo account non può visualizzare i profili."
      );
    }

    const uid = request.data?.uid;
    if (typeof uid !== "string" || !uid.trim()) {
      throw new HttpsError("invalid-argument", "Profilo non valido.");
    }

    const snapshot = await adminDb.collection("users").doc(uid).get();
    const user = snapshot.data();
    if (!snapshot.exists || !user || user.status !== "ACTIVE") {
      throw new HttpsError("not-found", "Profilo non disponibile.");
    }

    const profile = user.profile ?? {};
    const preferences = user.preferences ?? {};
    const selectedCategories = Array.isArray(preferences.interestedCategories)
      ? preferences.interestedCategories.filter(
          (category: unknown): category is string =>
            typeof category === "string" && ALLOWED_CATEGORIES.has(category)
        )
      : [];

    return {
      profile: {
        uid,
        displayName:
          profile.displayName || profile.username || "Utente Commety",
        username: profile.username || undefined,
        avatarUrl: profile.avatarUrl || undefined,
        city: profile.city || undefined,
        joinedAt: toIso(user.metadata?.createdAt),
        reputation: {
          score: Number(user.reputation?.score ?? 0),
          level: Number(user.reputation?.level ?? 1),
          xp: Number(user.reputation?.xp ?? 0),
        },
        statistics: {
          reports: Number(user.statistics?.reports ?? 0),
          confirmations: Number(user.statistics?.confirmations ?? 0),
          comments: Number(user.statistics?.comments ?? 0),
          photos: Number(user.statistics?.photos ?? 0),
        },
        preferences: {
          commetyMotivation:
            typeof preferences.commetyMotivation === "string"
              ? preferences.commetyMotivation.slice(0, 280)
              : undefined,
          interestedCategories: selectedCategories,
        },
      },
    };
  }
);
