import Image from "next/image";
import type { Metadata } from "next";
import { LiveMapSlider } from "@/components/Landing/LiveMapSlider";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Bell,
  Bike,
  Car,
  CirclePlus,
  CloudRain,
  Globe,
  MapPin,
  MessageCircle,
  PartyPopper,
  PawPrint,
  Send,
  ShieldCheck,
  Trees,
  TriangleAlert,
  Users,
  UsersRound,
  Waves,
} from "lucide-react";

const METALLIC_PANEL =
  "relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#1b4b87_64%,#0a2553_100%)] shadow-[0_22px_55px_rgba(2,16,42,0.3)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent_24%,rgba(255,255,255,0.16)_48%,transparent_64%)]";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://www.commety.it";

export const metadata: Metadata = {
  title: "Segnalazioni in tempo reale sulla mappa",
  description:
    "Scopri segnalazioni in tempo reale su meteo, viabilità, pericoli, eventi, mare e animali vicino a te. Commety è la mappa partecipata del mondo reale.",
  keywords: [
    "segnalazioni in tempo reale",
    "mappa segnalazioni",
    "meteo locale",
    "viabilità",
    "pericoli stradali",
    "eventi locali",
    "mare",
    "animali",
    "aree cani",
    "pet-friendly",
    "community",
    "Commety",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Commety | Segnalazioni in tempo reale sulla mappa",
    description:
      "La mappa partecipata per sapere cosa accade davvero vicino a te.",
    url: siteUrl,
    siteName: "Commety",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Commety, la mappa del mondo reale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commety | Segnalazioni in tempo reale sulla mappa",
    description:
      "La mappa partecipata per sapere cosa accade davvero vicino a te.",
    images: ["/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Commety",
  url: siteUrl,
  inLanguage: "it-IT",
  description:
    "La mappa partecipata con segnalazioni in tempo reale su ciò che accade sul territorio.",
};

interface LandingFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function LandingFeature({
  icon,
  title,
  description,
  className,
}: LandingFeatureProps) {
  return (
    <article className={`rounded-3xl border border-white/15 bg-[linear-gradient(145deg,rgba(24,74,135,0.9),rgba(8,35,80,0.96))] p-6 shadow-[0_14px_30px_rgba(2,16,42,0.26)] transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_20px_38px_rgba(2,16,42,0.36)] ${className ?? ""}`}>
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#b8ddff]">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>
      <p className="mt-3 leading-7 text-white/75">
        {description}
      </p>
    </article>
  );
}

function LiveMapPreview() {
  return <LiveMapSlider />;

  /*
  return (
    <div
      aria-label="Anteprima animata delle segnalazioni Commety sulla mappa"
      className="relative min-h-[420px] overflow-hidden rounded-[1.45rem] bg-[radial-gradient(circle_at_76%_8%,#b9def2_0%,#b9def2_18%,transparent_18.5%),radial-gradient(circle_at_18%_76%,#b8d4a6_0%,#b8d4a6_18%,transparent_18.5%),linear-gradient(145deg,#e8e6dc_0%,#d4decf_52%,#dce5d4_100%)] sm:min-h-[500px]"
    >
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(69,91,84,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(69,91,84,0.18)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute -right-[12%] -top-[9%] h-[48%] w-[48%] rotate-[20deg] rounded-[38%] bg-[#a9d8ed]/85" />
      <div className="absolute left-[8%] top-[9%] h-20 w-36 -rotate-12 rounded-[45%] border border-[#7da878]/35 bg-[#b9d3a7]/70" />
      <div className="absolute bottom-[12%] right-[8%] h-24 w-48 rotate-[13deg] rounded-[45%] border border-[#7da878]/35 bg-[#c2dcae]/70" />
      <div className="absolute -left-10 top-28 h-3 w-[125%] rotate-[-16deg] rounded-full bg-white/85 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute -right-14 top-64 h-2.5 w-[110%] rotate-[26deg] rounded-full bg-white/80 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute left-[16%] top-0 h-[120%] w-2 rotate-[28deg] bg-white/75 shadow-[0_0_0_5px_rgba(113,127,119,0.15)]" />
      <div className="absolute left-8 top-8 rounded-full border border-white/50 bg-[#061d43]/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white/85 shadow-sm backdrop-blur">
        <span className="mr-2 inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
        In diretta
      </div>

      <p className="absolute left-[14%] top-[27%] text-xs font-bold tracking-wide text-slate-700/65">ROMA</p>
      <p className="absolute right-[15%] top-[52%] text-xs font-bold tracking-wide text-slate-700/65">TIVOLI</p>
      <p className="absolute bottom-[22%] left-[38%] text-xs font-bold tracking-wide text-slate-700/65">CASTELLI ROMANI</p>

      <div className="commety-map-signal absolute left-[20%] top-[37%]" style={{ animationDelay: "-1.2s" }}>
        <span className="absolute -inset-3 rounded-full border border-[#2563FF]/60" />
        <span className="relative flex size-11 items-center justify-center rounded-2xl border-2 border-white bg-[#2563FF] text-white shadow-[0_10px_20px_rgba(37,99,255,0.5)]"><CloudRain className="size-5" /></span>
      </div>

      <div className="commety-map-signal absolute right-[31%] top-[35%]" style={{ animationDelay: "-2.7s" }}>
        <span className="absolute -inset-3 rounded-full border border-[#8B5CF6]/60" />
        <span className="relative flex size-11 items-center justify-center rounded-2xl border-2 border-white bg-[#8B5CF6] text-white shadow-[0_10px_20px_rgba(139,92,246,0.5)]"><Music2 className="size-5" /></span>
      </div>

      <div className="commety-map-signal absolute bottom-[24%] left-[25%]" style={{ animationDelay: "-3.5s" }}>
        <span className="absolute -inset-3 rounded-full border border-[#EF4444]/60" />
        <span className="relative flex size-11 items-center justify-center rounded-2xl border-2 border-white bg-[#EF4444] text-white shadow-[0_10px_20px_rgba(239,68,68,0.5)]"><TriangleAlert className="size-5" /></span>
      </div>

      <div className="commety-map-signal absolute bottom-[34%] right-[26%]" style={{ animationDelay: "-0.4s" }}>
        <span className="absolute -inset-3 rounded-full border border-[#F59E0B]/60" />
        <span className="relative flex size-11 items-center justify-center rounded-2xl border-2 border-white bg-[#F59E0B] text-white shadow-[0_10px_20px_rgba(245,158,11,0.5)]"><Car className="size-5" /></span>
      </div>

      <div className="commety-map-float absolute left-[11%] top-[53%] rounded-2xl border border-white/20 bg-[#071d43]/90 p-3 text-white shadow-[0_14px_30px_rgba(1,15,42,0.45)] backdrop-blur" style={{ animationDelay: "-1.8s" }}>
        <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-lg bg-[#2563FF]"><CloudRain className="size-4" /></span><div><p className="text-xs font-bold">Pioggia intensa</p><p className="text-[10px] text-white/60">segnalata ora</p></div></div>
      </div>

      <div className="commety-event-card absolute right-[6%] top-[12%] w-[188px] overflow-hidden rounded-2xl border border-violet-200/50 bg-[linear-gradient(135deg,#51248b_0%,#8B5CF6_56%,#b38bff_130%)] p-3 text-white shadow-[0_16px_32px_rgba(72,28,126,0.4)]" style={{ animationDelay: "-0.8s" }}>
        <div className="absolute -right-6 -top-6 size-20 rounded-full bg-white/15 blur-xl" />
        <div className="relative flex items-start justify-between gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl border border-white/30 bg-white/15"><Music2 className="size-4" /></span>
          <span className="rounded-full bg-white/20 px-2 py-1 text-[9px] font-bold uppercase tracking-wider">Evento</span>
        </div>
        <div className="relative mt-3">
          <p className="text-xs font-black">Concerto live</p>
          <p className="mt-0.5 text-[10px] text-violet-100">Piazza del Popolo · 21:30</p>
        </div>
        <div className="relative mt-3 flex items-end justify-between">
          <div className="commety-event-equalizer flex h-5 items-end gap-0.5" aria-hidden="true"><span /><span /><span /><span /><span /></div>
          <span className="text-[10px] font-bold text-white/85">43 interessati</span>
        </div>
      </div>

      <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur">
        <div><p className="text-xs font-bold text-white">Segnalazioni vicine a te</p><p className="mt-0.5 text-[11px] text-white/65">Aggiornate dalla community</p></div>
        <span className="rounded-xl bg-emerald-400 px-3 py-1.5 text-xs font-black text-[#063d2b]">+ 12</span>
      </div>
    </div>
  );
  */
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#174a87_0%,#0F2D5F_35%,#061735_100%)] pb-24 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_88%_8%,rgba(93,157,230,0.48),transparent_27%),radial-gradient(circle_at_15%_42%,rgba(64,132,214,0.3),transparent_29%),linear-gradient(145deg,#061735_0%,#0F2D5F_52%,#071a3c_100%)] pb-24 pt-6 text-white sm:pt-8">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />

        <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-center px-6 lg:px-8">
          <Image
            src="/logo-header-cropped.png"
            alt="Commety"
            width={260}
            height={69}
            priority
            className="h-16 w-auto object-contain [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.7))] sm:h-20"
            style={{ width: "auto" }}
          />

        </header>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-3 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pt-24">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur">
              <Activity className="size-4 text-[#8fc4ff]" />
              La mappa del mondo reale
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Tutto quello che accade,
              <span className="block bg-[linear-gradient(100deg,#ffffff_15%,#9ed1ff_58%,#ffffff_100%)] bg-clip-text text-transparent">
                in tempo reale.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/80 lg:mx-0 lg:text-xl">
              Scopri cosa succede vicino a te grazie alla community: dagli avvisi utili alle cose belle da non perdere, sempre in tempo reale.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              <span className="rounded-full border border-[#2563FF]/45 bg-[#2563FF]/15 px-4 py-2 text-sm font-semibold text-white"><CloudRain className="mr-1.5 inline size-4 text-[#2563FF]" />Meteo</span>
              <span className="rounded-full border border-[#EF4444]/45 bg-[#EF4444]/15 px-4 py-2 text-sm font-semibold text-white"><TriangleAlert className="mr-1.5 inline size-4 text-[#EF4444]" />Pericoli</span>
              <span className="rounded-full border border-[#8B5CF6]/45 bg-[#8B5CF6]/15 px-4 py-2 text-sm font-semibold text-white"><PartyPopper className="mr-1.5 inline size-4 text-[#8B5CF6]" />Eventi</span>
              <span className="rounded-full border border-[#06B6D4]/45 bg-[#06B6D4]/15 px-4 py-2 text-sm font-semibold text-white"><Waves className="mr-1.5 inline size-4 text-[#06B6D4]" />Mare</span>
              <span className="rounded-full border border-[#F97316]/45 bg-[#F97316]/15 px-4 py-2 text-sm font-semibold text-white"><PawPrint className="mr-1.5 inline size-4 text-[#F97316]" />Animali</span>
              <span className="rounded-full border border-[#F59E0B]/45 bg-[#F59E0B]/15 px-4 py-2 text-sm font-semibold text-white"><Car className="mr-1.5 inline size-4 text-[#F59E0B]" />Viabilità</span>
            </div>

            <p className="mt-5 text-sm font-medium text-[#c7e4ff]">
              Un concerto in piazza, una partita, un’iniziativa locale: Commety racconta anche ciò che vale la pena vivere.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a
                href="/mappa"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-7 py-4 text-lg font-bold text-white shadow-[0_14px_30px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-400"
              >
                Apri la mappa
                <ArrowRight className="size-5" />
              </a>
              <a
                href="#come-funziona"
                className="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-7 py-4 text-lg font-semibold text-white transition hover:bg-white/20"
              >
                Come funziona
              </a>
            </div>
          </div>

          <div className={`${METALLIC_PANEL} mx-auto w-full max-w-[620px] p-3 sm:p-5`}>
            <div className="relative z-10 overflow-hidden rounded-[1.45rem] border border-white/20 shadow-[0_18px_36px_rgba(1,14,39,0.36)]">
              <LiveMapPreview />
            </div>
          </div>
        </div>
      </section>

      <section id="come-funziona" className="commety-map-watermark relative overflow-hidden bg-white py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#2867ad]">Semplice. Partecipata. Utile.</p>
            <h2 className="commety-section-title mt-4 text-4xl font-black tracking-tight text-[#0b2858] sm:text-5xl">Commety trasforma il territorio in informazioni condivise.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <LandingFeature className="commety-section-card" icon={<MapPin className="size-7" />} title="Osserva" description="Guarda in tempo reale cosa sta accadendo vicino a te sulla mappa." />
            <LandingFeature className="commety-section-card commety-section-card-delay-1" icon={<CirclePlus className="size-7 text-emerald-600" />} title="Segnala" description="Invia una segnalazione in pochi secondi: meteo, traffico, eventi o pericoli." />
            <LandingFeature className="commety-section-card commety-section-card-delay-2" icon={<BadgeCheck className="size-7 text-amber-500" />} title="Conferma" description="La community verifica le segnalazioni e rende le informazioni più affidabili." />
            <LandingFeature className="commety-section-card commety-section-card-delay-3" icon={<Bell className="size-7 text-violet-600" />} title="Rimani informato" description="Ricevi aggiornamenti sulle situazioni che ti interessano davvero." />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071d43]/70 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`${METALLIC_PANEL} commety-metallic-sweep p-8 text-white sm:p-12`}>
            <div className="relative z-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#a9d5ff]">Per chi vive il territorio</p>
                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Una sola mappa, molte più certezze.</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">Dalla strada al mare, dagli avvisi alle occasioni da vivere, Commety riunisce ciò che rende il territorio più semplice e più vivo.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><CloudRain className="size-7 text-sky-200" /><p className="mt-3 font-bold">Appassionati meteo</p><p className="mt-1 text-sm leading-6 text-white/70">Fenomeni atmosferici, vento e condizioni locali.</p></div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><Bike className="size-7 text-orange-200" /><p className="mt-3 font-bold">Motociclisti</p><p className="mt-1 text-sm leading-6 text-white/70">Strade, lavori e pericoli prima di partire.</p></div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><Trees className="size-7 text-emerald-200" /><p className="mt-3 font-bold">Escursionisti</p><p className="mt-1 text-sm leading-6 text-white/70">Sentieri e situazioni nelle aree naturali.</p></div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5"><Users className="size-7 text-pink-200" /><p className="mt-3 font-bold">Famiglie</p><p className="mt-1 text-sm leading-6 text-white/70">Eventi e aggiornamenti rilevanti nella propria zona.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="commety-map-watermark relative overflow-hidden bg-white py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#2867ad]">Perché è diverso</p>
            <h2 className="commety-section-title mt-4 text-4xl font-black tracking-tight text-[#0b2858] sm:text-5xl">Non previsioni. Non supposizioni. Solo ciò che accade davvero.</h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <LandingFeature className="commety-section-card" icon={<Activity className="size-7 text-sky-600" />} title="Tempo reale" description="Le informazioni arrivano dalle persone presenti sul territorio, nel momento in cui accadono." />
            <LandingFeature className="commety-section-card commety-section-card-delay-1" icon={<UsersRound className="size-7 text-emerald-600" />} title="Verificato dalla community" description="Le conferme rendono visibile la fiducia intorno a ogni segnalazione." />
            <LandingFeature className="commety-section-card commety-section-card-delay-2" icon={<Globe className="size-7 text-indigo-600" />} title="Tutto in una mappa" description="Meteo, viabilità, eventi e pericoli raccolti in un'unica esperienza immediata." />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#071d43]/70 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`${METALLIC_PANEL} commety-metallic-sweep p-7 text-white sm:p-12`}>
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-[#d8ecff]">
                  <MessageCircle className="size-4 text-emerald-300" />
                  Conversazioni private
                </div>
                <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
                  Conosci le persone dietro la community.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">
                  Su Commety gli utenti registrati possono avviare una conversazione privata, dopo una richiesta accettata da entrambi.
                </p>
                <a
                  href="/chat"
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-bold text-white shadow-[0_14px_30px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-400"
                >
                  Scopri i messaggi
                  <ArrowRight className="size-5" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200"><UsersRound className="size-5" /></div>
                  <p className="mt-4 font-bold">Visita un profilo</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">Scopri gli altri membri registrati della community.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-sky-300/15 text-sky-200"><Send className="size-5" /></div>
                  <p className="mt-4 font-bold">Invia una richiesta</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">La conversazione parte solo con il consenso dell&apos;altra persona.</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-violet-300/15 text-violet-200"><ShieldCheck className="size-5" /></div>
                  <p className="mt-4 font-bold">Parla in privato</p>
                  <p className="mt-1 text-sm leading-6 text-white/70">Puoi terminare una chat o bloccare un utente in qualsiasi momento.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-16 text-center">
        <div className={`${METALLIC_PANEL} commety-metallic-sweep px-7 py-12 text-white sm:px-14 sm:py-16`}>
          <div className="relative z-10">
            <MapPin className="mx-auto size-10 text-[#a9d5ff]" />
            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Pronto a scoprire cosa accade intorno a te?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/80">Entra in Commety ed esplora la mappa delle segnalazioni, degli eventi e delle occasioni in tempo reale create dalla community.</p>
            <a href="/mappa" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 text-lg font-bold text-white shadow-[0_14px_30px_rgba(16,185,129,0.28)] transition hover:-translate-y-0.5 hover:bg-emerald-400">Apri la mappa <ArrowRight className="size-5" /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#061735] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <Image src="/logo-header-cropped.png" alt="Commety" width={150} height={40} className="h-9 w-auto object-contain" style={{ width: "auto" }} />
            <p className="mt-3 text-sm text-white/60">La mappa del mondo reale.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70"><a className="transition hover:text-white" href="/privacy">Privacy Policy</a><a className="transition hover:text-white" href="/termini">Termini di utilizzo</a><a className="transition hover:text-white" href="mailto:privacy@commety.it">Contatti</a></div>
          <p className="text-sm text-white/45">© 2026 Commety</p>
        </div>
      </footer>

    </main>
  );
}
