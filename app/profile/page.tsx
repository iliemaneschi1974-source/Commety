"use client";


import { ProfileGallery } from "@/components/Profile/ProfileGallery";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileReports } from "@/components/Profile/ProfileReports";
import { ProfileStats } from "@/components/Profile/ProfileStats";
import { AccountActions } from "@/components/Profile/AccountActions";

import { useProfile } from "@/hooks/useProfile";
import { useUserReports } from "@/hooks/useUserReports";
import { updateUser } from "@/services/users";

export default function ProfilePage() {
  const {
    loading,
    user,
    profileHeader,
    profileStats,
  } = useProfile();

  const {
    reports,
    gallery,
    reportsCount,
    mediaCount,
    loading: reportsLoading,
  } = useUserReports();

  if (loading || reportsLoading) {
    return (
      <main className="mx-auto flex w-full max-w-3xl justify-center p-10">
        <p className="text-muted-foreground">
          Caricamento profilo...
        </p>
      </main>
    );
  }

  if (!profileHeader || !profileStats) {
    return (
      <main className="mx-auto flex w-full max-w-3xl justify-center p-10">
        <p className="text-muted-foreground">
          Profilo non disponibile.
        </p>
      </main>
    );
  }

  const stats = {
    ...profileStats,
    reports: reportsCount,
    photos: mediaCount,
  };

  async function handleSaveNickname(nickname: string) {
    if (!user) {
      return;
    }

    await updateUser(user.uid, {
      profile: {
        ...user.profile,
        displayName: nickname,
      },
    });
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6 pb-28">
      <ProfileHeader
        profile={profileHeader}
        onSaveNickname={handleSaveNickname}
      />

      <ProfileStats stats={stats} />

      <ProfileReports reports={reports} />

      <ProfileGallery images={gallery} />

      <AccountActions />

    </main>
  );
}
