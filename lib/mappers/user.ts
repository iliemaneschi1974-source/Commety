import { Timestamp } from "firebase/firestore";

import { UserDocument } from "@/types/firestore-user";
import { CommettyUser } from "@/types/user";

/**
 * Converte un Timestamp Firestore
 * in stringa ISO.
 */
function toIsoString(
  timestamp?: Timestamp | null
): string {
  return timestamp
    ? timestamp.toDate().toISOString()
    : new Date().toISOString();
}

/**
 * Converte un documento Firestore nel dominio CommettyUser.
 */
export function toCommettyUser(
  document: UserDocument
): CommettyUser {
  return {
    uid: document.uid,

    email: document.email,

    role: document.role,

    status: document.status,

    profile: document.profile,

    statistics: document.statistics,

    reputation: document.reputation,

    preferences: document.preferences,

    consents: document.consents
      ? {
          privacyPolicyVersion: document.consents.privacyPolicyVersion,
          termsVersion: document.consents.termsVersion,
          legalAcceptedAt: document.consents.legalAcceptedAt
            ? toIsoString(document.consents.legalAcceptedAt)
            : undefined,
          analyticsEnabled: document.consents.analyticsEnabled,
          analyticsConsentUpdatedAt:
            document.consents.analyticsConsentUpdatedAt
              ? toIsoString(document.consents.analyticsConsentUpdatedAt)
              : undefined,
        }
      : undefined,

    metadata: {
      createdAt: toIsoString(
        document.metadata.createdAt
      ),

      updatedAt: toIsoString(
        document.metadata.updatedAt
      ),

      lastLoginAt: document.metadata.lastLoginAt
        ? toIsoString(document.metadata.lastLoginAt)
        : undefined,
    },
  };
}

/**
 * Converte il dominio CommettyUser
 * nel documento Firestore.
 */
export function toUserDocument(
  user: CommettyUser
): UserDocument {
  return {
    uid: user.uid,

    email: user.email,

    role: user.role,

    status: user.status,

    profile: user.profile,

    statistics: user.statistics,

    reputation: user.reputation,

    preferences: user.preferences,

    consents: user.consents
      ? {
          privacyPolicyVersion: user.consents.privacyPolicyVersion,
          termsVersion: user.consents.termsVersion,
          legalAcceptedAt: user.consents.legalAcceptedAt
            ? Timestamp.fromDate(new Date(user.consents.legalAcceptedAt))
            : undefined,
          analyticsEnabled: user.consents.analyticsEnabled,
          analyticsConsentUpdatedAt:
            user.consents.analyticsConsentUpdatedAt
              ? Timestamp.fromDate(
                  new Date(user.consents.analyticsConsentUpdatedAt)
                )
              : undefined,
        }
      : undefined,

    metadata: {
      createdAt: Timestamp.fromDate(
        new Date(user.metadata.createdAt)
      ),

      updatedAt: Timestamp.fromDate(
        new Date(user.metadata.updatedAt)
      ),

      lastLoginAt: user.metadata.lastLoginAt
        ? Timestamp.fromDate(
            new Date(user.metadata.lastLoginAt)
          )
        : undefined,
    },
  };
}
