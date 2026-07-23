"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const news = [
  {
    href: "/news/segnalazioni-guasti-windtre-iliad-tim-fastweb-vodafone",
    image: "/news-guasti-rete-hero.png",
    imageAlt: "Guasti di rete visualizzati su una mappa digitale",
    date: "23 luglio 2026",
    title: "Guasti WINDTRE, iliad, TIM, Fastweb e Vodafone: come segnalarli",
    abstract:
      "Numeri utili, canali ufficiali e controlli da fare quando internet, fibra o rete mobile non funzionano.",
  },
  {
    href: "/news/segnalazioni-in-tempo-reale-perche-sono-importanti",
    image: "/og-institutional-map.png",
    imageAlt: "Segnalazioni geolocalizzate sulla mappa di Commety",
    date: "23 luglio 2026",
    title: "Segnalazioni in tempo reale: perché sono importanti?",
    abstract:
      "Come le informazioni tempestive e geolocalizzate aiutano le persone a comprendere il territorio e prendere decisioni migliori.",
  },
  {
    href: "/news/commety-su-gofundme",
    image: "/landing-maria-rossi.png",
    imageAlt: "Una persona della community Commety",
    date: "22 luglio 2026",
    title: "Commety è su GoFundMe",
    abstract:
      "Una raccolta per far crescere una piattaforma italiana dedicata al territorio, all’inclusione e a una community più connessa.",
  },
] as const;

export default function NewsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    sliderRef.current?.scrollBy({
      left: direction * sliderRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  }

  return (
    <section
      aria-labelledby="news-slider-title"
      className="overflow-hidden border-t border-[#dbe8f8] bg-[#f5f9ff] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#2867ad]">
              Dal mondo Commety
            </p>
            <h2
              id="news-slider-title"
              className="mt-3 text-4xl font-black tracking-tight text-[#0b2858] sm:text-5xl"
            >
              Ultime News
            </h2>
          </div>

          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Mostra le news precedenti"
              className="inline-flex size-12 items-center justify-center rounded-full border border-[#b9d3f3] bg-white text-[#0F2D5F] shadow-sm transition hover:border-[#77a8df] hover:bg-[#eaf3ff] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#77a8df]/50"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Mostra le news successive"
              className="inline-flex size-12 items-center justify-center rounded-full border border-[#b9d3f3] bg-white text-[#0F2D5F] shadow-sm transition hover:border-[#77a8df] hover:bg-[#eaf3ff] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#77a8df]/50"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          tabIndex={0}
          aria-label="Elenco scorrevole delle news"
          className="mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#77a8df]/50 [&::-webkit-scrollbar]:hidden"
        >
          {news.map((article) => (
            <article
              key={article.href}
              className="group flex min-w-[88%] snap-start flex-col overflow-hidden rounded-[1.75rem] border border-[#cfe1f6] bg-white shadow-[0_18px_42px_rgba(10,43,89,0.1)] sm:min-w-[68%] lg:min-w-[calc(50%_-_0.625rem)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#dcecff]">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 68vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2867ad]">
                  {article.date}
                </p>
                <h3 className="mt-3 text-2xl font-black leading-tight text-[#0b2858] sm:text-3xl">
                  {article.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-7 text-[#47658a] sm:text-lg">
                  {article.abstract}
                </p>
                <Link
                  href={article.href}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-[#0F2D5F] px-5 py-3 font-black text-white transition hover:bg-[#1b4b87] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#77a8df]/60"
                >
                  Leggi l&apos;articolo
                  <ArrowRight className="size-5 transition group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-[#5d7594]">
            Scorri orizzontalmente per leggere le altre notizie.
          </p>
          <Link
            href="/news"
            className="shrink-0 text-sm font-black text-[#1b62ad] transition hover:text-[#0F2D5F]"
          >
            Tutte le news
          </Link>
        </div>
      </div>
    </section>
  );
}
