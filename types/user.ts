export type UserRole =
  | "USER"
  | "VERIFIED_REPORTER"
  | "MODERATOR"
  | "ADMIN"

export type UserStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "BANNED"

export interface UserProfile {
  username: string
  displayName: string

  avatarUrl?: string

  bio?: string

  city?: string
}

export interface UserStatistics {
  reports: number

  confirmations: number

  comments: number

  photos: number
}

export interface UserReputation {
  score: number

  level: number

  xp: number

  verified: boolean
}

export interface UserPreferences {
  notificationsEnabled: boolean

  darkMode: boolean

  /** Motivo dichiarato dall'utente durante l'onboarding del profilo. */
  commetyMotivation?: string

  /** Categorie che l'utente desidera seguire maggiormente. */
  interestedCategories?: import("@/types/report").ReportCategory[]

  /** Evita di mostrare nuovamente l'onboarding delle preferenze. */
  preferencesOnboardingCompleted?: boolean
}

export interface UserConsents {
  privacyPolicyVersion?: string
  termsVersion?: string
  legalAcceptedAt?: string
  analyticsEnabled?: boolean
  analyticsConsentUpdatedAt?: string
}

export interface UserMetadata {
  createdAt: string

  updatedAt: string

  lastLoginAt?: string
}

export interface CommettyUser {
  uid: string

  email?: string

  role: UserRole

  status: UserStatus

  profile: UserProfile

  statistics: UserStatistics

  reputation: UserReputation

  preferences: UserPreferences

  consents?: UserConsents

  metadata: UserMetadata
}
