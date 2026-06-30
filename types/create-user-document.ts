import { FieldValue } from "firebase/firestore";

import {
  UserPreferences,
  UserProfile,
  UserReputation,
  UserRole,
  UserStatistics,
  UserStatus,
} from "@/types/user";

export interface CreateUserDocument {
  uid: string;

  email?: string;

  role: UserRole;

  status: UserStatus;

  profile: UserProfile;

  statistics: UserStatistics;

  reputation: UserReputation;

  preferences: UserPreferences;

  metadata: {
    createdAt: FieldValue;

    updatedAt: FieldValue;

    lastLoginAt?: FieldValue;
  };
}