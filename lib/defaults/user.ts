import { CommettyUser } from "@/types/user";

export const DEFAULT_USER: Omit<
  CommettyUser,
  "uid" | "email"
> = {
  role: "USER",

  status: "ACTIVE",

  profile: {
    username: "",

    displayName: "",

    avatarUrl: "",

    bio: "",

    city: "",
  },

  statistics: {
    reports: 0,

    confirmations: 0,

    comments: 0,

    photos: 0,
  },

  reputation: {
    score: 0,

    level: 1,

    xp: 0,

    verified: false,
  },

  preferences: {
    notificationsEnabled: true,

    darkMode: false,
  },

  metadata: {
    createdAt: "",

    updatedAt: "",
  },
};