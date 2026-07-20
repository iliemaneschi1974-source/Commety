import { ReportCategory } from "@/types/report";

export interface PublicProfile {
  uid: string;
  displayName: string;
  username?: string;
  avatarUrl?: string;
  city?: string;
  joinedAt?: string;
  reputation: {
    score: number;
    level: number;
    xp: number;
  };
  statistics: {
    reports: number;
    confirmations: number;
    comments: number;
    photos: number;
  };
  preferences: {
    commetyMotivation?: string;
    interestedCategories: ReportCategory[];
  };
}
