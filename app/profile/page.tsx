"use client";

import { ProfileGallery } from "@/components/Profile/ProfileGallery";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileReports } from "@/components/Profile/ProfileReports";
import { ProfileStats } from "@/components/Profile/ProfileStats";
import { Card, CardContent } from "@/components/ui/card";

import { useProfile } from "@/hooks/useProfile";

import {
  profileGalleryMock,
  profileReportsMock,
} from "@/lib/mock/profile";

export default function ProfilePage() {
  const {
    loading,
    profileHeader,
    profileStats,
  } = useProfile();

  if (loading) {
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

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <Card>
        <CardContent className="py-10">
          <div className="space-y-10">
            <ProfileHeader profile={profileHeader} />

            <div className="border-t border-border/50 pt-8">
              <ProfileStats stats={profileStats} />
            </div>

            <div className="border-t border-border/50 pt-8">
              <ProfileReports reports={profileReportsMock} />
            </div>

            <div className="border-t border-border/50 pt-8">
              <ProfileGallery images={profileGalleryMock} />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}