import Image from "next/image";
import { Check, MapPin, Pencil, X } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InfoRow } from "@/components/ui/info-row";
import { Progress } from "@/components/ui/progress";
import { ProfileHeaderData } from "@/types/profile";

interface ProfileHeaderProps {
  profile: ProfileHeaderData;
  onSaveNickname: (nickname: string) => Promise<void>;
}

const MAX_NICKNAME_LENGTH = 30;

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
  onSaveNickname,
}: ProfileHeaderProps) {
  const [editingNickname, setEditingNickname] = useState(false);
  const [nickname, setNickname] = useState(profile.nickname);
  const [savingNickname, setSavingNickname] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
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

  async function handleSaveNickname() {
    const trimmedNickname = nickname.trim();

    if (!trimmedNickname) {
      setNicknameError("Inserisci un nome utente.");
      return;
    }

    try {
      setSavingNickname(true);
      setNicknameError("");
      await onSaveNickname(trimmedNickname);
      setEditingNickname(false);
    } catch (error) {
      console.error("Errore aggiornamento nome utente:", error);
      setNicknameError("Non è stato possibile salvare il nome utente.");
    } finally {
      setSavingNickname(false);
    }
  }

  function handleCancelNicknameEdit() {
    setNickname(profile.nickname);
    setNicknameError("");
    setEditingNickname(false);
  }

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
        {editingNickname ? (
          <div className="w-full max-w-xs">
            <div className="flex items-center gap-2">
              <input
                value={nickname}
                maxLength={MAX_NICKNAME_LENGTH}
                onChange={(event) => setNickname(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-white/70 bg-white/95 px-3 py-2 text-center text-lg font-bold text-[#0F2D5F] outline-none focus:border-white focus:ring-4 focus:ring-white/20"
                aria-label="Nome utente"
                autoFocus
              />

              <button
                type="button"
                onClick={handleSaveNickname}
                disabled={savingNickname}
                aria-label="Salva nome utente"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:opacity-50"
              >
                <Check className="size-5" />
              </button>

              <button
                type="button"
                onClick={handleCancelNicknameEdit}
                disabled={savingNickname}
                aria-label="Annulla modifica nome utente"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="mt-2 text-xs text-white/75">
              {nickname.length} / {MAX_NICKNAME_LENGTH} caratteri
            </p>

            {nicknameError && (
              <p className="mt-1 text-xs text-red-300" role="alert">
                {nicknameError}
              </p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {profile.nickname}
            </h1>

            <button
              type="button"
              onClick={() => setEditingNickname(true)}
              aria-label="Modifica nome utente"
              title="Modifica nome utente"
              className="flex size-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 active:scale-95"
            >
              <Pencil className="size-4" />
            </button>
          </div>
        )}

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
