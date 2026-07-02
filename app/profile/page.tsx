"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { ProfileGallery } from "@/components/Profile/ProfileGallery";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileReports } from "@/components/Profile/ProfileReports";
import { ProfileStats } from "@/components/Profile/ProfileStats";
import { CommetyHeader } from "@/components/ui/CommetyHeader";

import { useProfile } from "@/hooks/useProfile";
import { useUserReports } from "@/hooks/useUserReports";

export default function ProfilePage() {
  const {
    loading,
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

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-6">
      <CommetyHeader
        title="Profilo"
        subtitle="La tua reputazione"
        leftSlot={
          <Link
            href="/mappa"
            aria-label="Torna alla mappa"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        }
      />

      <ProfileHeader profile={profileHeader} />

      <ProfileStats stats={stats} />

      <ProfileReports reports={reports} />

      <ProfileGallery images={gallery} />
    </main>
  );
}