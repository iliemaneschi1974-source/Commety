import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, Newspaper, RadioTower, WifiOff } from "lucide-react";

export const metadata: Metadata = {
  title: "News | Commety",
  description: "Le novita, gli aggiornamenti e le storie di Commety.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_78%_0%,#1b4b87_0%,#0F2D5F_28%,#061735_70%)] text-white">
      <header className="border-b border-white/10 bg-[#061735]/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link href="/" aria-label="Commety">
            <Image src="/logo-header-cropped.png" alt="Commety" width={150} height={40} className="h-9 w-auto object-contain [filter:drop-shadow(0_0_9px_rgba(255,255,255,0.45))]" style={{ width: "auto" }} />
          </Link>
          <Link href="/" className="rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">Torna a Commety</Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a9d5ff]">Dal mondo Commety</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">News</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Novita, idee e passi concreti per costruire la mappa del mondo reale.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 sm:px-8 sm:pb-20">
        <Link href="/news/segnalazioni-guasti-windtre-iliad-tim-fastweb-vodafone" className="group block overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#9f3f35_100%)] shadow-[0_22px_55px_rgba(2,16,42,0.3)] transition hover:-translate-y-1 hover:border-white/30">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-12">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-200"><WifiOff className="size-6" /></div>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-[#a9d5ff]">23 luglio 2026</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">Segnalazioni guasti WINDTRE, iliad, TIM, Fastweb e Vodafone</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Numeri utili, canali ufficiali e guida pratica per segnalare problemi a internet, fibra e rete mobile.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-bold text-orange-200">Leggi la guida <ArrowRight className="size-5 transition group-hover:translate-x-1" /></span>
            </div>
            <div className="relative min-h-64">
              <Image src="/news-guasti-rete-hero.png" alt="Guasti di rete visualizzati su una mappa digitale" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,26,60,0.35),transparent)]" />
            </div>
          </div>
        </Link>

        <Link href="/news/segnalazioni-in-tempo-reale-perche-sono-importanti" className="group block overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#17698b_100%)] shadow-[0_22px_55px_rgba(2,16,42,0.3)] transition hover:-translate-y-1 hover:border-white/30">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-12">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200"><RadioTower className="size-6" /></div>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-[#a9d5ff]">23 luglio 2026</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">Segnalazioni in tempo reale: perch&eacute; sono importanti?</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Come le informazioni tempestive e geolocalizzate aiutano le persone a capire il territorio e prendere decisioni migliori.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-bold text-cyan-200">Leggi l&apos;articolo <ArrowRight className="size-5 transition group-hover:translate-x-1" /></span>
            </div>
            <div className="relative min-h-64 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.85),transparent_14%),radial-gradient(circle_at_50%_45%,rgba(59,130,246,0.35),transparent_40%),linear-gradient(145deg,#17698b,#071a3c_70%)]">
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:34px_34px]" />
              <RadioTower className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-white/90 drop-shadow-[0_0_24px_rgba(103,232,249,0.7)]" />
            </div>
          </div>
        </Link>

        <Link href="/news/commety-su-gofundme" className="group block overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,#071a3c_0%,#0F2D5F_42%,#1b4b87_64%,#0a2553_100%)] shadow-[0_22px_55px_rgba(2,16,42,0.3)] transition hover:-translate-y-1 hover:border-white/30">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-8 sm:p-12">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-300"><HeartHandshake className="size-6" /></div>
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.16em] text-[#a9d5ff]">22 luglio 2026</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">Commety &egrave; su GoFundMe</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">Abbiamo aperto una raccolta per far crescere una piattaforma italiana, utile e costruita con la community.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-bold text-emerald-300">Leggi la notizia <ArrowRight className="size-5 transition group-hover:translate-x-1" /></span>
            </div>
            <div className="relative min-h-64 bg-[radial-gradient(circle_at_60%_36%,rgba(75,155,255,0.9),transparent_16%),radial-gradient(circle_at_25%_68%,rgba(16,185,129,0.75),transparent_12%),linear-gradient(145deg,#1b4b87,#071a3c_64%)]">
              <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:34px_34px]" />
              <Newspaper className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-white/85 drop-shadow-[0_0_22px_rgba(255,255,255,0.45)]" />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
