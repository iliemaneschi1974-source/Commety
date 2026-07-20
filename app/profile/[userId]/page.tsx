"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";
import { MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";

import { REPORT_CATEGORY_CONFIG } from "@/lib/reportCategoryConfig";
import { getReliabilityProfile } from "@/lib/reliability";
import { useAuth } from "@/contexts/AuthContext";
import { getPublicProfile } from "@/services/public-profile";
import { openChat } from "@/services/chat";
import { PublicProfile } from "@/types/public-profile";

function formatJoinDate(date?: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("it-IT", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = use(params);
  const { loading, user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [error, setError] = useState("");
  const [openingChat, setOpeningChat] = useState(false);

  useEffect(() => {
    if (!user || user.uid !== userId) return;
    router.replace("/profile");
  }, [router, user, userId]);

  useEffect(() => {
    if (!user || user.uid === userId) return;

    let active = true;
    void getPublicProfile(userId)
      .then((nextProfile) => {
        if (active) setProfile(nextProfile);
      })
      .catch((nextError) => {
        console.error("Errore caricamento profilo pubblico:", nextError);
        if (active) setError("Questo profilo non è disponibile.");
      });

    return () => {
      active = false;
    };
  }, [user, userId]);

  const reliability = useMemo(
    () => getReliabilityProfile(profile?.reputation.score ?? 0),
    [profile?.reputation.score]
  );

  async function handleOpenChat() {
    if (!profile || openingChat) return;

    try {
      setOpeningChat(true);
      await openChat(profile.uid);
      router.push(`/chat?utente=${encodeURIComponent(profile.uid)}`);
    } catch (nextError) {
      console.error("Errore richiesta chat dal profilo:", nextError);
      setError("Non è stato possibile inviare la richiesta di messaggio.");
    } finally {
      setOpeningChat(false);
    }
  }

  if (loading) {
    return <main className="p-10 text-center text-slate-500">Caricamento profilo...</main>;
  }

  if (!user) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 p-6 text-center">
        <MessageCircle className="size-12 text-[#1b4b87]" />
        <h1 className="text-2xl font-black text-[#0F2D5F]">Profilo Commety</h1>
        <p className="text-slate-600">Accedi per vedere i profili degli altri membri della community.</p>
      </main>
    );
  }

  if (error) {
    return <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center p-6 text-center text-slate-600">{error}</main>;
  }

  if (!profile) {
    return <main className="p-10 text-center text-slate-500">Caricamento profilo...</main>;
  }

  const initials = profile.displayName.slice(0, 2).toUpperCase();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-7 p-6 pb-28">
      <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_38%,#1b4b87_58%,#0a2553_100%)] p-6 text-center text-white shadow-[0_18px_45px_rgba(6,24,61,0.32)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_25%,rgba(255,255,255,0.2)_48%,transparent_62%)] sm:p-8">
        <div className="relative z-10">
          <Image src="/logo-header-cropped.png" alt="Commety" width={180} height={48} priority className="mx-auto h-11 w-auto object-contain [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.75))_drop-shadow(0_6px_8px_rgba(2,16,42,0.7))]" />
          <div className="mx-auto mt-6 grid size-28 place-items-center overflow-hidden rounded-full bg-white/20 text-3xl font-black ring-4 ring-white/70 shadow-md">
            {profile.avatarUrl ? <Image src={profile.avatarUrl} alt={profile.displayName} width={112} height={112} className="size-full object-cover" /> : initials}
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight">{profile.displayName}</h1>
          {profile.city || profile.joinedAt ? <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/85"><MapPin className="size-4" />{profile.city ? profile.city : "Membro Commety"}{profile.joinedAt ? ` · Iscritto da ${formatJoinDate(profile.joinedAt)}` : ""}</p> : null}
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0F2D5F]"><Star className="size-3.5 fill-current" />Livello {profile.reputation.level}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-300 px-3 py-1.5 text-xs font-bold text-[#063d2b]"><ShieldCheck className="size-3.5" />{reliability.label}</span>
          </div>
          <button type="button" onClick={() => void handleOpenChat()} disabled={openingChat} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3.5 font-black text-white shadow-[0_12px_26px_rgba(16,185,129,0.28)] transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
            <MessageCircle className="size-5" />
            {openingChat ? "Apertura richiesta..." : "Ti piacerebbe parlare con me?"}
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,45,95,0.08)] sm:p-6">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#1b4b87]">Il suo spazio</p>
        <h2 className="mt-1 text-xl font-black text-slate-900">Le sue preferenze</h2>
        {profile.preferences.commetyMotivation ? <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">{profile.preferences.commetyMotivation}</p> : <p className="mt-4 text-sm text-slate-500">Questo membro non ha ancora aggiunto le proprie preferenze.</p>}
        {profile.preferences.interestedCategories.length > 0 ? <div className="mt-4 flex flex-wrap gap-2">{profile.preferences.interestedCategories.map((category) => { const config = REPORT_CATEGORY_CONFIG[category]; return <span key={category} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold text-white shadow-sm" style={{ backgroundColor: config.color }}>{config.icon}{config.label}</span>; })}</div> : null}
      </section>

      <section className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_30px_rgba(15,45,95,0.08)] sm:grid-cols-4">
        {[["Segnalazioni", profile.statistics.reports], ["Conferme", profile.statistics.confirmations], ["Commenti", profile.statistics.comments], ["Foto e video", profile.statistics.photos]].map(([label, value]) => <div key={String(label)} className="border-b border-r border-slate-100 p-5 text-center last:border-r-0 sm:border-b-0"><p className="text-2xl font-black text-[#0F2D5F]">{Number(value).toLocaleString("it-IT")}</p><p className="mt-1 text-xs font-medium text-slate-500">{label}</p></div>)}
      </section>
    </main>
  );
}
