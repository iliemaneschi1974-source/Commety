import { Timestamp } from "firebase/firestore";

import {
  UserPreferences,
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

  metadata: {
    createdAt: Timestamp;

    updatedAt: Timestamp;

    lastLoginAt?: Timestamp;
  };
}