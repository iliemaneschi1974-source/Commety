import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <nav className="hidden lg:flex gap-12 text-lg font-medium text-slate-800">
            <a href="#come-funziona">Come funziona</a>
            <a href="#funzionalita">Funzionalità</a>
            <a href="#per-chi">Per chi</a>
            <a href="#roadmap">Roadmap</a>
          </nav>

          {/* Mobile */}
          <button className="lg:hidden bg-[#2563FF] text-white px-5 py-3 rounded-xl font-semibold">
            Menu
          </button>

          {/* CTA Desktop */}
          <button className="hidden lg:block bg-[#2563FF] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#1f56e5] transition">
            Entra nella lista d'attesa
          </button>
        </div>
      </header>

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
    </main>
  );
}