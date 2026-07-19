import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({
  eyebrow,
  title,
  updatedAt,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_78%_0%,#1b4b87_0%,#0F2D5F_28%,#061735_70%)] text-white">
      <header className="border-b border-white/10 bg-[#061735]/75 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Torna a Commety
          </Link>
          <Link href="/" aria-label="Commety">
            <Image
              src="/logo-header-cropped.png"
              alt="Commety"
              width={150}
              height={40}
              className="h-9 w-auto object-contain [filter:drop-shadow(0_0_9px_rgba(255,255,255,0.45))]"
              style={{ width: "auto" }}
            />
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 sm:px-8 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a9d5ff]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 text-sm text-white/65">
            Ultimo aggiornamento: {updatedAt}
          </p>
        </div>
      </section>

      <article className="commety-legal-content mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16">
        {children}
      </article>

      <footer className="border-t border-white/10 bg-[#061735]">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-8 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="inline-flex items-center gap-2">
            <MapPin className="size-4 text-[#a9d5ff]" />
            Commety, la mappa del mondo reale.
          </p>
          <nav className="flex gap-5">
            <Link className="transition hover:text-white" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="transition hover:text-white" href="/termini">
              Termini di utilizzo
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
