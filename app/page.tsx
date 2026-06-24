"use client";

import Image from "next/image";
import { useState } from "react";
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-12 text-lg font-medium text-slate-800">
            <a href="#come-funziona">Come funziona</a>
            <a href="#per-chi">Per chi</a>
            <a href="#diverso">Perchè è diverso</a>
          </nav>

          {/* Mobile */}
          <button
  onClick={() => setMenuOpen(true)}
  className="lg:hidden bg-[#2563FF] text-white px-5 py-3 rounded-xl font-semibold"
>
  ☰
</button>

          {/* CTA Desktop */}
          <button className="hidden lg:block bg-[#2563FF] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#1f56e5] transition">
            Entra nella lista d'attesa
          </button>
        </div>
      </header>
{menuOpen && (
  <div className="fixed inset-0 z-50 bg-white flex flex-col">

    <div className="flex justify-end p-6">
      <button
        onClick={() => setMenuOpen(false)}
        className="text-4xl font-light"
      >
        ×
      </button>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center gap-10">

      <a
        href="#come-funziona"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-semibold"
      >
        Come funziona
      </a>

    

      <a
        href="#per-chi"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-semibold"
      >
        Per chi
      </a>

      <a
        href="#diverso"
        onClick={() => setMenuOpen(false)}
        className="text-3xl font-semibold"
      >
        Perché è diverso
      </a>

      <button className="mt-8 bg-[#2563FF] text-white px-8 py-4 rounded-2xl font-semibold">
        Entra nella lista d'attesa
      </button>

    </div>

  </div>
)}
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">

          {/* SINISTRA */}
          <div className="text-center lg:text-left">

            {/* LOGO */}
            <Image
              src="/logo.png"
              alt="Commety"
              width={420}
              height={110}
              priority
              className="mb-6 mx-auto lg:mx-0 w-[280px] md:w-[340px] lg:w-[420px] h-auto"
            />

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

            {/* CTA */}
            <button className="mt-10 mx-auto lg:mx-0 w-fit bg-[#2563FF] text-white px-10 py-5 rounded-2xl text-lg lg:text-xl font-semibold hover:bg-[#1f56e5] transition">
              Entra nella lista d'attesa
            </button>
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
  className="max-w-7xl mx-auto px-6 lg:px-8 py-24"
>
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#08122E]">
      Come funziona?
    </h2>

    <p className="mt-4 text-xl text-slate-600">
      Condividi e scopri ciò che accade davvero intorno a te.
    </p>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-4">📍</div>

      <h3 className="text-2xl font-bold text-[#08122E]">
        Osserva
      </h3>

      <p className="mt-3 text-slate-600">
        Guarda in tempo reale cosa sta accadendo
        vicino a te sulla mappa.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-4">➕</div>

      <h3 className="text-2xl font-bold text-[#08122E]">
        Segnala
      </h3>

      <p className="mt-3 text-slate-600">
        Invia una segnalazione in pochi secondi:
        meteo, traffico, eventi o pericoli.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-4">✅</div>

      <h3 className="text-2xl font-bold text-[#08122E]">
        Conferma
      </h3>

      <p className="mt-3 text-slate-600">
        La community verifica le segnalazioni
        rendendo le informazioni affidabili.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-4">🔔</div>

      <h3 className="text-2xl font-bold text-[#08122E]">
        Rimani informato
      </h3>

      <p className="mt-3 text-slate-600">
        Ricevi aggiornamenti e alert
        sugli eventi che ti interessano.
      </p>
    </div>

  </div>
</section>
<section
  id="per-chi"
  className="max-w-7xl mx-auto px-6 lg:px-8 py-24"
>
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#08122E]">
      Per chi è Commety
    </h2>

    <p className="mt-4 text-xl text-slate-600">
      Uno strumento utile per chi vuole sapere cosa accade davvero sul territorio.
    </p>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

  <div className="bg-white rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
    <div className="text-5xl mb-4">🌧️</div>
    <h3 className="text-xl font-bold text-[#08122E] min-h-[56px] flex items-center justify-center">
      Appassionati meteo
    </h3>
  </div>

  <div className="bg-white rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
    <div className="text-5xl mb-4">🏍️</div>
    <h3 className="text-xl font-bold text-[#08122E] min-h-[56px] flex items-center justify-center">
      Motociclisti
    </h3>
  </div>

  <div className="bg-white rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
    <div className="text-5xl mb-4">🥾</div>
    <h3 className="text-xl font-bold text-[#08122E] min-h-[56px] flex items-center justify-center">
      Escursionisti
    </h3>
  </div>

  <div className="bg-white rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
    <div className="text-5xl mb-4">🚗</div>
    <h3 className="text-xl font-bold text-[#08122E] min-h-[56px] flex items-center justify-center">
      Automobilisti
    </h3>
  </div>

  <div className="bg-white rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
    <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
    <h3 className="text-xl font-bold text-[#08122E] min-h-[56px] flex items-center justify-center">
      Famiglie
    </h3>
  </div>

  <div className="bg-white rounded-3xl p-8 text-center shadow-sm flex flex-col items-center">
    <div className="text-5xl mb-4">🛡️</div>
    <h3 className="text-xl font-bold text-[#08122E] min-h-[56px] flex items-center justify-center">
      Protezione Civile
    </h3>
  </div>

</div>
</section>
<section id="diverso" className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
  <div className="text-center mb-16">
    <h2 className="text-4xl lg:text-5xl font-extrabold text-[#08122E]">
      Perché Commety è diverso
    </h2>

    <p className="mt-4 text-xl text-slate-600">
      Non previsioni. Non supposizioni. Solo ciò che sta accadendo davvero.
    </p>
  </div>

  <div className="grid lg:grid-cols-3 gap-8">

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-6">⚡</div>

      <h3 className="text-2xl font-bold text-[#08122E] mb-4">
        Tempo reale
      </h3>

      <p className="text-slate-600 text-lg">
        Le informazioni arrivano direttamente dalle persone
        presenti sul territorio, nel momento in cui accadono.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-6">👥</div>

      <h3 className="text-2xl font-bold text-[#08122E] mb-4">
        Verificato dalla community
      </h3>

      <p className="text-slate-600 text-lg">
        Le segnalazioni vengono confermate dagli altri utenti,
        aumentando affidabilità e qualità delle informazioni.
      </p>
    </div>

    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <div className="text-5xl mb-6">🗺️</div>

      <h3 className="text-2xl font-bold text-[#08122E] mb-4">
        Tutto in una sola mappa
      </h3>

      <p className="text-slate-600 text-lg">
        Meteo, viabilità, eventi e situazioni di pericolo
        raccolti in un unico punto.
      </p>
    </div>

  </div>
</section>
<section className="max-w-5xl mx-auto px-6 py-24 text-center">
  <h2 className="text-4xl lg:text-6xl font-extrabold text-[#08122E]">
    Pronto a scoprire cosa accade davvero intorno a te?
  </h2>

  <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
    Unisciti ai primi utenti che proveranno Commety e aiutaci a costruire
    la più grande rete di segnalazioni in tempo reale.
  </p>

  <button className="mt-10 bg-[#2563FF] text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-[#1f56e5] transition">
    Entra nella lista d'attesa
  </button>
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