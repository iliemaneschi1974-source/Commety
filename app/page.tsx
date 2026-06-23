import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex gap-12 text-lg font-medium text-slate-800">
            <a href="#">Come funziona</a>
            <a href="#">Funzionalità</a>
            <a href="#">Per chi</a>
            <a href="#">Roadmap</a>
          </nav>

          <button className="bg-[#2563FF] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#1f56e5] transition">
            Entra nella lista d'attesa
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-8 pt-0 pb-12">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-center">
          {/* COLONNA SINISTRA */}
          <div className="flex flex-col justify-start">
            <Image
              src="/logo.png"
              alt="Commety"
              width={360}
              height={96}
              priority
              className="mb-4"
            />

            <h1 className="text-[78px] leading-[0.92] font-extrabold text-[#08122E]">
              Tutto quello che accade
              <br />
              <span className="text-[#2563FF]">
                in tempo reale.
              </span>
            </h1>

            <p className="mt-8 text-2xl text-slate-600 leading-relaxed max-w-2xl">
              Scopri cosa sta succedendo vicino a te grazie alle
              segnalazioni in tempo reale della community.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
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

            <button className="mt-10 w-fit bg-[#2563FF] text-white px-10 py-5 rounded-2xl text-xl font-semibold hover:bg-[#1f56e5] transition">
              Entra nella lista d'attesa
            </button>
          </div>

          {/* COLONNA DESTRA */}
          <div className="flex justify-center items-center">
            <Image
              src="/esempio.png"
              alt="Commety piattaforma desktop e mobile"
              width={850}
              height={650}
              priority
            />
          </div>
        </div>
      </section>
    </main>
  );
}