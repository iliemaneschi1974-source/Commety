import { Timestamp } from "firebase/firestore";

import {
  UserPreferences,
  UserConsents,
  UserProfile,
  UserReputation,
  UserRole,
  UserStatistics,
  UserStatus,
} from "@/types/user";

export interface UserDocument {
  uid: string;

  email?: string;

  role: UserRole;

  status: UserStatus;

  profile: UserProfile;

  statistics: UserStatistics;

  reputation: UserReputation;

  preferences: UserPreferences;

  consents?: Omit<UserConsents, "legalAcceptedAt" | "analyticsConsentUpdatedAt"> & {
    legalAcceptedAt?: Timestamp;
    analyticsConsentUpdatedAt?: Timestamp;
  };

  metadata: {
    createdAt: Timestamp;

    updatedAt: Timestamp;

    lastLoginAt?: Timestamp;
  };
}
