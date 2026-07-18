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
    profile.xpForNextLevel !== null
      ? Math.min(
          (profile.currentLevelXp /
            profile.xpForNextLevel) *
            100,
          100
        )
      : 0;

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
      className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_38%,#1b4b87_58%,#0a2553_100%)] p-6 text-white shadow-[0_18px_45px_rgba(6,24,61,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_48%,transparent_62%)] [&>*]:relative [&>*]:z-10 sm:p-8"
    >
      <Avatar className="relative size-32 overflow-hidden ring-4 ring-white/70 shadow-md">
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
          <AvatarFallback className="bg-white/20 text-4xl font-semibold text-white">
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
          className="text-white/85"
        >
          {profile.city
            ? `${profile.city} · Iscritto il ${joinedAt}`
            : `Iscritto il ${joinedAt}`}
        </InfoRow>

        {profile.subtitle && (
          <p className="text-sm text-white/80">
            {profile.subtitle}
          </p>
        )}
      </div>

      <div className="w-full max-w-sm border-t border-white/30 pt-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-semibold">
            Livello {profile.level}
          </span>

          <span className="text-sm text-white/85">
            {profile.xpForNextLevel === null
              ? `${profile.currentXp} XP totali`
              : `${profile.currentLevelXp} / ${profile.xpForNextLevel} XP`}
          </span>
        </div>

        <Progress
          value={progress}
          className="bg-white/25 [&>div]:bg-white"
        />

        <p className="mt-3 text-center text-sm text-white/85">
          {profile.xpForNextLevel === null
            ? "Hai raggiunto il livello massimo"
            : `Mancano ${profile.remainingXp} XP al livello successivo`}
        </p>
      </div>
    </div>
  );
}
