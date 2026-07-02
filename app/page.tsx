"use client";
import {
  Bike,
  Car,
  CloudRain,
  Shield,
  Trees,
  Users,
  Activity,
  Globe,
  UsersRound,
  Bell,
  BadgeCheck,
  CirclePlus,
  MapPin,
} from "lucide-react";

import { FeatureItem } from "@/components/ui/feature-item";
import Image from "next/image";
import { CommetyLogo } from "@/components/ui/CommetyLogo";
import { Surface } from "@/components/ui/Surface";
export default function Home() {
  

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* HEADER */}
     <header className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-6">
  <div className="flex justify-center">
    <CommetyLogo priority />
  </div>
</header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">

          {/* SINISTRA */}
          <div className="text-center lg:text-left">

            
           

            {/* CLAIM */}
            <h1 className="text-5xl md:text-6xl lg:text-[78px] leading-[0.92] font-extrabold text-[#08122E]">
              Tutto quello che accade
              <br />
              <span className="text-[#2563FF]">
                in tempo reale.
              </span>
            </h1>

            {/* DESCRIZIONE */}
            <p className="mt-8 text-lg md:text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Scopri cosa sta succedendo vicino a te grazie alle
              segnalazioni in tempo reale della community.
            </p>

            {/* TAG */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-10">
              <span className="px-5 py-3 rounded-full bg-blue-100 text-blue-700">
                ☔ Meteo
              </span>

              <span className="px-5 py-3 rounded-full bg-orange-100 text-orange-700">
                ⚠️ Pericoli
              </span>

              <span className="px-5 py-3 rounded-full bg-red-100 text-red-700">
                🔥 Eventi
              </span>

              <span className="px-5 py-3 rounded-full bg-cyan-100 text-cyan-700">
                🌊 Mare
              </span>

              <span className="px-5 py-3 rounded-full bg-purple-100 text-purple-700">
                🚗 Viabilità
              </span>
            </div>
<br></br>
            {/* CTA */}
           
<div className="mt-10 flex justify-center lg:justify-start">
  <a
    href="/mappa"
    className="inline-flex items-center justify-center rounded-2xl bg-[#2563FF] px-10 py-5 text-lg lg:text-xl font-semibold text-white transition hover:bg-[#1f56e5]"
  >
    🗺️ Apri la mappa
  </a>
</div>
          </div>

          {/* DESTRA */}
          <div className="flex justify-center items-center">
            <Image
              src="/esempio.png"
              alt="Commety piattaforma desktop e mobile"
              width={900}
              height={900}
              priority
              className="w-full max-w-[420px] md:max-w-[550px] lg:max-w-[850px] h-auto"
            />
          </div>

        </div>
      </section>
      <section
  id="come-funziona"
  className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
>
  <div className="mb-14 text-center">
    <h2 className="text-4xl font-extrabold text-[#08122E] lg:text-5xl">
      Come funziona?
    </h2>

    <p className="mt-4 text-xl text-slate-600">
      Condividi e scopri ciò che accade davvero intorno a te.
    </p>
  </div>

  <Surface className="p-8 lg:p-10">
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <FeatureItem
        icon={
          <MapPin className="h-10 w-10 text-sky-600" />
        }
        title="Osserva"
        description="Guarda in tempo reale cosa sta accadendo vicino a te sulla mappa."
      />

      <FeatureItem
        icon={
          <CirclePlus className="h-10 w-10 text-emerald-600" />
        }
        title="Segnala"
        description="Invia una segnalazione in pochi secondi: meteo, traffico, eventi o pericoli."
      />

      <FeatureItem
        icon={
          <BadgeCheck className="h-10 w-10 text-amber-500" />
        }
        title="Conferma"
        description="La community verifica le segnalazioni rendendo le informazioni sempre più affidabili."
      />

      <FeatureItem
        icon={
          <Bell className="h-10 w-10 text-violet-600" />
        }
        title="Rimani informato"
        description="Ricevi aggiornamenti e notifiche sugli eventi che ti interessano davvero."
      />
    </div>
  </Surface>
</section>
<section
  id="per-chi"
  className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
>
  <div className="mb-14 text-center">
    <h2 className="text-4xl font-extrabold text-[#08122E] lg:text-5xl">
      Per chi è Commety?
    </h2>

    <p className="mt-4 text-xl text-slate-600">
      Uno strumento utile per chi vuole sapere cosa accade davvero sul territorio.
    </p>
  </div>

  <Surface className="p-8 lg:p-10">
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <FeatureItem
        icon={<CloudRain className="h-12 w-12 text-sky-600" />}
        title="Appassionati meteo"
        description="Segui temporali, piogge, vento e tutti i fenomeni atmosferici in tempo reale."
      />

      <FeatureItem
        icon={<Bike className="h-12 w-12 text-orange-500" />}
        title="Motociclisti"
        description="Scopri incidenti, lavori e condizioni della strada prima di partire."
      />

      <FeatureItem
        icon={<Trees className="h-12 w-12 text-emerald-600" />}
        title="Escursionisti"
        description="Controlla sentieri, meteo e possibili pericoli nelle aree naturali."
      />

      <FeatureItem
        icon={<Car className="h-12 w-12 text-indigo-600" />}
        title="Automobilisti"
        description="Ricevi informazioni su traffico, incidenti e viabilità lungo il percorso."
      />

      <FeatureItem
        icon={<Users className="h-12 w-12 text-pink-500" />}
        title="Famiglie"
        description="Rimani informato sugli eventi e sulle situazioni che riguardano la tua zona."
      />

      <FeatureItem
        icon={<Shield className="h-12 w-12 text-red-500" />}
        title="Protezione Civile"
        description="Uno strumento in più per monitorare rapidamente ciò che viene segnalato sul territorio."
      />
    </div>
  </Surface>
</section>
<section
  id="diverso"
  className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
>
  <div className="mb-14 text-center">
    <h2 className="text-4xl font-extrabold text-[#08122E] lg:text-5xl">
      Perché Commety è diverso?
    </h2>

    <p className="mt-4 text-xl text-slate-600">
      Non previsioni. Non supposizioni. Solo ciò che sta accadendo davvero.
    </p>
  </div>

  <Surface className="p-8 lg:p-10">
    <div className="grid gap-10 lg:grid-cols-3">
      <FeatureItem
        icon={<Activity className="h-12 w-12 text-sky-600" />}
        title="Tempo reale"
        description="Le informazioni arrivano direttamente dalle persone presenti sul territorio, nel momento esatto in cui accadono."
      />

      <FeatureItem
        icon={<UsersRound className="h-12 w-12 text-emerald-600" />}
        title="Verificato dalla community"
        description="Le segnalazioni vengono confermate dagli altri utenti, aumentando affidabilità e qualità delle informazioni."
      />

      <FeatureItem
        icon={<Globe className="h-12 w-12 text-indigo-600" />}
        title="Tutto in una sola mappa"
        description="Meteo, viabilità, eventi e situazioni di pericolo raccolti in un'unica esperienza semplice e immediata."
      />
    </div>
  </Surface>
</section>
<section
  id="cta"
  className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center"
>
  <h2 className="text-4xl lg:text-6xl font-extrabold text-[#08122E]">
    Pronto a scoprire cosa accade davvero intorno a te?
  </h2>

  <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
    Entra in Commety ed esplora la mappa delle segnalazioni in tempo reale
    create dalla community.
  </p>

  <a
    href="/mappa"
    className="mt-10 inline-flex items-center justify-center rounded-2xl bg-[#2563FF] px-10 py-5 text-xl font-semibold text-white transition hover:bg-[#1f56e5]"
  >
    🗺️ Apri la mappa
  </a>
</section>
<footer className="bg-[#08122E] text-white mt-20">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

    <div className="flex flex-col lg:flex-row justify-between gap-12">

      <div>
        <h3 className="text-3xl font-bold">
          Commety
        </h3>

        <p className="mt-4 text-slate-300 text-lg">
          La mappa del mondo reale.
        </p>
      </div>

      <div className="flex flex-col gap-3 text-slate-300">
        <a href="#">Privacy Policy</a>
        <a href="#">Termini di utilizzo</a>
        <a href="#">Contatti</a>
      </div>

    </div>

    <div className="border-t border-slate-700 mt-12 pt-8 text-slate-400">
      © 2026 Commety. Tutti i diritti riservati.
    </div>

  </div>
</footer>
    </main>
  );
}