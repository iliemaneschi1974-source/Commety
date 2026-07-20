"use client";

import {
  Check,
  CloudRain,
  Heart,
  MessageCircle,
  PartyPopper,
  PawPrint,
  Send,
  TriangleAlert,
  UserRound,
  Waves,
} from "lucide-react";
import { useEffect, useState } from "react";

const SCENES = [
  { id: "mappa", label: "In diretta", title: "La mappa si muove con te", detail: "Segnalazioni aggiornate dalla community" },
  { id: "profilo", label: "La community", title: "Ogni contributo lascia il segno", detail: "Un profilo, interessi e reputazione" },
  { id: "chat", label: "Messaggi privati", title: "Parla con la community", detail: "Solo dopo una richiesta accettata" },
] as const;

type SceneId = (typeof SCENES)[number]["id"];

function MapScene() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_79%_14%,#c3e0ed_0%,#c3e0ed_17%,transparent_17.5%),radial-gradient(circle_at_17%_75%,#b9d6a5_0%,#b9d6a5_19%,transparent_19.5%),linear-gradient(145deg,#e6e2d7_0%,#ced9c9_52%,#dde5d5_100%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(69,91,84,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(69,91,84,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -left-10 top-28 h-3 w-[125%] rotate-[-16deg] rounded-full bg-white/85 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute -right-14 top-64 h-2.5 w-[110%] rotate-[26deg] rounded-full bg-white/80 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute left-[16%] top-0 h-[120%] w-2 rotate-[28deg] bg-white/75 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <p className="absolute left-[14%] top-[27%] text-xs font-bold tracking-wide text-slate-700/65">ROMA</p>
      <p className="absolute right-[15%] top-[52%] text-xs font-bold tracking-wide text-slate-700/65">TIVOLI</p>
      <p className="absolute bottom-[22%] left-[38%] text-xs font-bold tracking-wide text-slate-700/65">CASTELLI ROMANI</p>

      <MapMarker className="left-[22%] top-[42%]" color="#2563FF" icon={<CloudRain className="size-5" />} delay="-1.2s" />
      <MapMarker className="right-[25%] top-[33%]" color="#8B5CF6" icon={<PartyPopper className="size-5" />} delay="-2s" />
      <MapMarker className="bottom-[25%] left-[35%]" color="#EF4444" icon={<TriangleAlert className="size-5" />} delay="-0.5s" />
      <MapMarker className="bottom-[37%] right-[20%]" color="#F97316" icon={<PawPrint className="size-5" />} delay="-1.7s" />
      <MapMarker className="right-[11%] bottom-[22%]" color="#06B6D4" icon={<Waves className="size-5" />} delay="-2.4s" />

      <div className="commety-map-float absolute bottom-[26%] left-[9%] rounded-2xl border border-white/25 bg-[#071d43]/90 px-3 py-2.5 text-white shadow-[0_14px_30px_rgba(1,15,42,0.35)] backdrop-blur">
        <p className="text-xs font-bold">Nuovo evento vicino a te</p>
        <p className="mt-0.5 text-[10px] text-white/65">aggiornato ora</p>
      </div>
    </>
  );
}

function MapMarker({ className, color, icon, delay }: { className: string; color: string; icon: React.ReactNode; delay: string }) {
  return (
    <div className={`commety-map-signal absolute ${className}`} style={{ animationDelay: delay }}>
      <span className="absolute -inset-3 rounded-full border" style={{ borderColor: color, animationDelay: delay }} />
      <span className="relative flex size-11 items-center justify-center rounded-2xl border-2 border-white text-white shadow-[0_10px_20px_rgba(2,16,42,0.35)]" style={{ backgroundColor: color }}>{icon}</span>
    </div>
  );
}

function ProfileScene() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_13%,rgba(89,164,244,0.58),transparent_26%),radial-gradient(circle_at_15%_85%,rgba(46,181,141,0.28),transparent_25%),linear-gradient(145deg,#071a3c_0%,#123c77_56%,#081d43_100%)]">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="commety-preview-profile absolute left-1/2 top-1/2 w-[78%] max-w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-[1.7rem] border border-white/20 bg-white/95 p-5 text-[#102d5e] shadow-[0_25px_55px_rgba(0,9,30,0.42)] sm:p-6">
        <div className="absolute inset-x-0 top-0 h-28 rounded-t-[1.7rem] bg-[linear-gradient(135deg,#071a3c,#245a9b_70%,#0d2b5f)]" />
        <div className="relative flex items-end gap-3 pt-14">
          <div className="flex size-16 items-center justify-center rounded-2xl border-4 border-white bg-[linear-gradient(135deg,#88b5df,#1e4b80)] text-white shadow-lg"><UserRound className="size-8" /></div>
          <div className="pb-1"><p className="font-black">Martina R.</p><p className="text-xs font-semibold text-emerald-600">Membro verificato</p></div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <ProfileStat label="Segnalazioni" value="24" />
          <ProfileStat label="Foto e video" value="18" />
          <ProfileStat label="Livello" value="5" />
        </div>
        <div className="mt-4 rounded-2xl bg-[#edf5ff] p-3 text-xs font-semibold text-[#26558f]">
          <Heart className="mr-1 inline size-3.5 text-rose-500" /> Ama eventi, mare e vita locale
        </div>
      </div>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-100 px-1 py-2"><p className="text-base font-black">{value}</p><p className="mt-0.5 text-[9px] font-bold text-slate-500">{label}</p></div>;
}

function ChatScene() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_16%,rgba(72,190,163,0.42),transparent_26%),radial-gradient(circle_at_10%_80%,rgba(72,134,227,0.38),transparent_28%),linear-gradient(145deg,#071a3c_0%,#123b77_56%,#061735_100%)]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="commety-preview-chat absolute inset-x-[8%] top-1/2 -translate-y-1/2 overflow-hidden rounded-[1.65rem] border border-white/25 bg-[#f8fbff] shadow-[0_25px_55px_rgba(0,9,30,0.42)]">
        <div className="flex items-center gap-3 bg-[linear-gradient(135deg,#071a3c,#245a9b)] px-5 py-4 text-white">
          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/20 text-emerald-200"><UserRound className="size-5" /></div>
          <div><p className="font-black">Luca M.</p><p className="text-xs text-emerald-200">Utente registrato</p></div>
          <MessageCircle className="ml-auto size-5 text-white/70" />
        </div>
        <div className="space-y-3 p-5 text-sm sm:p-6">
          <div className="commety-preview-message max-w-[75%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-[#173765] shadow-sm">Ciao! Ho visto la tua segnalazione.</div>
          <div className="commety-preview-message commety-preview-message-delay ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-emerald-500 px-4 py-2.5 text-white shadow-sm">Grazie, il concerto è davvero bello! <Check className="ml-1 inline size-3.5" /></div>
          <div className="commety-preview-message commety-preview-message-late max-w-[71%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-2.5 text-[#173765] shadow-sm">Ci vediamo lì allora.</div>
        </div>
        <div className="flex items-center gap-2 border-t border-slate-100 px-5 py-3 text-xs text-slate-400"><span className="h-2 flex-1 rounded-full bg-slate-100" /><Send className="size-4 text-emerald-500" /></div>
      </div>
    </div>
  );
}

function SceneContent({ scene }: { scene: SceneId }) {
  if (scene === "profilo") return <ProfileScene />;
  if (scene === "chat") return <ChatScene />;
  return <MapScene />;
}

export function LiveMapSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScene = SCENES[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % SCENES.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div aria-label="Anteprima animata di mappa, profili e messaggi Commety" className="relative min-h-[420px] overflow-hidden rounded-[1.45rem] sm:min-h-[500px]">
      <div key={activeScene.id} className="commety-preview-scene absolute inset-0"><SceneContent scene={activeScene.id} /></div>

      <div className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#061d43]/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-sm backdrop-blur">
        <span className="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
        {activeScene.label}
      </div>

      <div className="absolute bottom-6 left-6 right-6 z-20 rounded-2xl border border-white/20 bg-[#061d43]/88 p-3.5 text-white shadow-[0_14px_30px_rgba(1,15,42,0.35)] backdrop-blur">
        <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-black">{activeScene.title}</p><p className="mt-0.5 text-[10px] text-white/65">{activeScene.detail}</p></div><div className="flex gap-1.5">{SCENES.map((scene, index) => <span key={scene.id} className={`h-1.5 rounded-full transition-all ${index === activeIndex ? "w-5 bg-emerald-400" : "w-1.5 bg-white/35"}`} />)}</div></div>
      </div>
    </div>
  );
}
