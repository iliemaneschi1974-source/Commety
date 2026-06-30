"use client"

import { ProfileGallery } from "@/components/Profile/ProfileGallery"
import { ProfileHeader } from "@/components/Profile/ProfileHeader"
import { ProfileReports } from "@/components/Profile/ProfileReports"
import { ProfileStats } from "@/components/Profile/ProfileStats"
import { Card, CardContent } from "@/components/ui/card"
import {
  profileGalleryMock,
  profileHeaderMock,
  profileReportsMock,
  profileStatsMock,
} from "@/lib/mock/profile"

export default function ProfilePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <Card>
        <CardContent className="py-10">
          <div className="space-y-10">
            <ProfileHeader profile={profileHeaderMock} />

            <div className="border-t border-border/50 pt-8">
              <ProfileStats stats={profileStatsMock} />
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
  )
}