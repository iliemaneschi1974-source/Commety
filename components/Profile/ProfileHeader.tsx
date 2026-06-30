import Image from "next/image";
import { MapPin } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InfoRow } from "@/components/ui/info-row";
import { Progress } from "@/components/ui/progress";
import { ProfileHeaderData } from "@/types/profile";

interface ProfileHeaderProps {
  profile: ProfileHeaderData;
}

function formatJoinDate(date: string) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

export function ProfileHeader({
  profile,
}: ProfileHeaderProps) {
  const progress =
    profile.nextLevelXp > 0
      ? Math.min(
          (profile.currentXp /
            profile.nextLevelXp) *
            100,
          100
        )
      : 0;

  const remainingXp = Math.max(
    profile.nextLevelXp -
      profile.currentXp,
    0
  );

  const initials = profile.nickname
    .trim()
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const joinedAt =
    formatJoinDate(profile.joinedAt);

  return (
    <div
      data-slot="profile-header"
      className="flex flex-col items-center gap-6"
    >
      <Avatar className="relative size-32 overflow-hidden ring-4 ring-background shadow-md">
        {profile.avatarUrl ? (
          <Image
            src={profile.avatarUrl}
            alt={profile.nickname}
            fill
            className="object-cover"
            sizes="128px"
            priority
          />
        ) : (
          <AvatarFallback className="text-4xl font-semibold">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {profile.nickname}
        </h1>

        <InfoRow
          icon={<MapPin className="size-4" />}
        >
          {profile.city
            ? `${profile.city} · Iscritto il ${joinedAt}`
            : `Iscritto il ${joinedAt}`}
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
            {profile.currentXp} /{" "}
            {profile.nextLevelXp} XP
          </span>
        </div>

        <Progress value={progress} />

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Mancano {remainingXp} XP al
          livello successivo
        </p>
      </div>
    </div>
  );
}