"use client";

import { Map } from "lucide-react";
import Link from "next/link";

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
    photosCount,
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
    photos: photosCount,
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
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6">
      <ProfileHeader
        profile={profileHeader}
        onSaveNickname={handleSaveNickname}
      />

      <ProfileStats stats={stats} />

      <ProfileReports reports={reports} />

      <ProfileGallery images={gallery} />

      <AccountActions />

      <Link
        href="/mappa"
        aria-label="Torna alla mappa"
        title="Torna alla mappa"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_45%,#1b4b87_100%)] text-white shadow-[0_12px_28px_rgba(2,16,42,0.38)] transition hover:scale-105 hover:brightness-110 active:scale-95"
      >
        <Map className="size-7" aria-hidden="true" />
      </Link>
    </main>
  );
}
