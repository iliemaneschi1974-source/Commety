"use client";

import { useMemo } from "react";

import { useAuth } from "@/contexts/AuthContext";

import {
  ProfileGalleryItem,
  ProfileHeaderData,
  ProfileStatsData,
} from "@/types/profile";

export function useProfile() {
  const { user, loading } = useAuth();

  const profileHeader = useMemo<ProfileHeaderData | null>(() => {
    if (!user) {
      return null;
    }

    return {
      avatarUrl: user.profile.avatarUrl,

      nickname:
        user.profile.displayName ||
        user.profile.username,

      city: user.profile.city,

      joinedAt: user.metadata.createdAt,

      subtitle: user.profile.bio,

      level: user.reputation.level,

      currentXp: user.reputation.xp,

      nextLevelXp: 100,
    };
  }, [user]);

  const profileStats = useMemo<ProfileStatsData | null>(() => {
    if (!user) {
      return null;
    }

    return {
      reports: user.statistics.reports,

      confirmations:
        user.statistics.confirmations,

      comments:
        user.statistics.comments,

      photos:
        user.statistics.photos,
    };
  }, [user]);

  const profileGallery = useMemo<
    ProfileGalleryItem[]
  >(() => {
    return [];
  }, []);

  return {
    loading,

    user,

    profileHeader,

    profileStats,

    profileGallery,
  };
}