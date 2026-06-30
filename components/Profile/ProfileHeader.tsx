import { MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InfoRow } from "@/components/ui/info-row"
import { Progress } from "@/components/ui/progress"
import { ProfileHeaderData } from "@/types/profile"

interface ProfileHeaderProps {
  profile: ProfileHeaderData
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const progress =
    profile.nextLevelXp > 0
      ? Math.min((profile.currentXp / profile.nextLevelXp) * 100, 100)
      : 0

  const remainingXp = Math.max(
    profile.nextLevelXp - profile.currentXp,
    0
  )

  const initials = profile.nickname
    .trim()
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      data-slot="profile-header"
      className="flex flex-col items-center gap-6"
    >
      <Avatar className="size-32 ring-4 ring-background shadow-md">
        {profile.avatarUrl && (
          <AvatarImage
            src={profile.avatarUrl}
            alt={profile.nickname}
          />
        )}

        <AvatarFallback className="text-4xl font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {profile.nickname}
        </h1>

        <InfoRow icon={<MapPin className="size-4" />}>
          {profile.city
            ? `${profile.city} · Iscritto da ${profile.joinedAt}`
            : `Iscritto da ${profile.joinedAt}`}
        </InfoRow>

        {profile.subtitle && (
          <p className="text-sm text-muted-foreground">
            {profile.subtitle}
          </p>
        )}
      </div>

      <div className="w-full max-w-sm border-t border-border/50 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">
            Livello {profile.level}
          </span>

          <span className="text-sm text-muted-foreground">
            {profile.currentXp} / {profile.nextLevelXp} XP
          </span>
        </div>

        <Progress value={progress} />

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Mancano {remainingXp} XP al livello successivo
        </p>
      </div>
    </div>
  )
}