import { Timestamp } from "firebase/firestore";

import { UserDocument } from "@/types/firestore-user";
import { CommettyUser } from "@/types/user";

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

    metadata: {
      createdAt: document.metadata.createdAt.toDate().toISOString(),

      updatedAt: document.metadata.updatedAt.toDate().toISOString(),

      lastLoginAt:
        document.metadata.lastLoginAt?.toDate().toISOString(),
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