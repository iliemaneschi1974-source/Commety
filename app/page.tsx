import Image from "next/image";

export default function Home() {
  return (
<main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <Image
  src="/logo-commety.png"
  alt="Commety"
  width={400}
  height={110}
  className="w-[400px] h-auto mb-8"
/>

      <p className="text-blue-600 font-extrabold text-5xl mb-4">
        Scopri adesso
      </p>

      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-3xl">
        cosa sta succedendo vicino a te.
      </h1>

      <p className="mt-6 text-lg text-gray-600 max-w-2xl">
        Segnalazioni in tempo reale dalla community italiana.
        <br />
        Scopri meteo, viabilità, pericoli ed emergenze vicino a te.
      </p>

      <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-700 transition">
        Entra nella Beta
      </button>

    </main>
  );
}