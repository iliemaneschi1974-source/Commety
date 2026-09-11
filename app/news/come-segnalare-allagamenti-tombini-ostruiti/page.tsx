import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  CloudRainWind,
  Droplets,
  MapPinned,
  Phone,
  ShieldAlert,
  Smartphone,
  Waves,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const slug = "/news/come-segnalare-allagamenti-tombini-ostruiti";
const articleUrl = `${siteUrl}${slug}`;
const heroImage = `${siteUrl}/logo-commety.png`;
const publishedAt = "2026-09-11T07:30:00+02:00";

const title =
  "Allagamenti e tombini ostruiti: come fare una segnalazione utile";
const description =
  "Guida pratica per segnalare allagamenti, caditoie e tombini ostruiti: quando chiamare i soccorsi, cosa comunicare al Comune e come segnalarlo su Commety.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "come segnalare allagamento",
    "segnalare tombino ostruito",
    "caditoia ostruita Comune",
    "strada allagata cosa fare",
    "allagamento sottopasso",
    "rischio idrogeologico urbano",
    "segnalazione maltempo",
    "Protezione Civile temporali",
    "segnalazione allagamento Commety",
  ],
  authors: [{ name: "Commety", url: siteUrl }],
  creator: "Commety",
  publisher: "Commety",
  category: "Maltempo e territorio",
  alternates: { canonical: slug },
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
    type: "article",
    url: articleUrl,
    title,
    description,
    siteName: "Commety",
    locale: "it_IT",
    publishedTime: publishedAt,
    modifiedTime: publishedAt,
    section: "Maltempo e territorio",
    tags: [
      "allagamenti",
      "tombini ostruiti",
      "maltempo",
      "Protezione Civile",
      "Comune",
      "Commety",
    ],
    images: [
      {
        url: heroImage,
        width: 512,
        height: 512,
        alt: "Logo Commety",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImage],
  },
};

const faqs = [
  {
    question: "Chi devo chiamare se una strada e' allagata?",
    answer:
      "Se c'e' pericolo per persone, veicoli, abitazioni o sottopassi chiama subito i soccorsi, in particolare il 112 o i Vigili del Fuoco. Per una situazione non urgente segnala il problema al Comune, alla Polizia Locale o al servizio manutenzione indicato dall'ente.",
  },
  {
    question: "Cosa devo indicare nella segnalazione al Comune?",
    answer:
      "Servono posizione precisa, strada, civico o incrocio vicino, data e ora, livello dell'acqua, presenza di tombini o caditoie ostruiti, traffico coinvolto e foto scattate da un luogo sicuro.",
  },
  {
    question: "Posso segnalare un allagamento su Commety?",
    answer:
      "Si. Dopo aver avvisato i canali competenti quando necessario, puoi pubblicare la posizione su Commety per informare in tempo reale le persone vicine e raccogliere conferme locali.",
  },
  {
    question: "Commety sostituisce una chiamata di emergenza?",
    answer:
      "No. Commety aiuta la comunita' a vedere cosa sta accadendo sul territorio, ma non sostituisce il 112, i Vigili del Fuoco, la Protezione Civile o i canali ufficiali del Comune.",
  },
];

const checklist = [
  "Posizione esatta: via, civico, incrocio, quartiere o coordinate.",
  "Tipo di problema: strada allagata, sottopasso, caditoia ostruita, tombino sollevato o acqua che entra in un edificio.",
  "Livello apparente dell'acqua e rapidita' con cui aumenta.",
  "Presenza di persone, veicoli bloccati, cantieri, scuole, negozi o accessi impediti.",
  "Foto ampia del punto e, se sicuro, dettaglio dell'ostruzione.",
  "Data, ora e condizioni meteo al momento della segnalazione.",
];

export default function FloodingGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        headline: title,
        description,
        image: [heroImage],
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        inLanguage: "it-IT",
        articleSection: "Maltempo e territorio",
        keywords:
          "allagamenti, tombini ostruiti, caditoie, maltempo, segnalazioni al Comune, Commety",
        author: { "@type": "Organization", name: "Commety", url: siteUrl },
        publisher: {
          "@type": "Organization",
          name: "Commety",
          url: siteUrl,
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo-commety.png` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Commety", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "News", item: `${siteUrl}/news` },
          { "@type": "ListItem", position: 3, name: title, item: articleUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f4f9fb] text-[#0b2d3a]">
      <header className="border-b border-[#cfe2ea] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link href="/" aria-label="Commety">
            <Image
              src="/logo-header-cropped.png"
              alt="Commety"
              width={150}
              height={40}
              className="h-9 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#17698b] transition hover:bg-[#e8f5fa]"
          >
            <ArrowLeft className="size-4" /> Tutte le news
          </Link>
        </div>
      </header>

      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <section className="bg-[radial-gradient(circle_at_84%_8%,#23a6d5_0%,#17698b_36%,#061735_100%)] px-6 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b9efff]">
              Guide Commety &middot; 11 settembre 2026
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Allagamenti e tombini ostruiti: come fare una segnalazione utile
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/80">
              Durante un temporale forte anche un tombino ostruito puo&apos;
              trasformare una strada in un punto critico. La differenza la fa
              una segnalazione precisa, fatta al canale giusto e condivisa con
              chi si trova vicino.
            </p>
            <div className="relative mt-10 min-h-72 overflow-hidden rounded-[1.75rem] border border-white/15 bg-[radial-gradient(circle_at_28%_30%,rgba(185,239,255,0.95),transparent_14%),radial-gradient(circle_at_68%_58%,rgba(32,167,115,0.7),transparent_16%),linear-gradient(145deg,#23a6d5,#071a3c_72%)] shadow-[0_20px_46px_rgba(0,0,0,0.28)]">
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:34px_34px]" />
              <CloudRainWind className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-[58%] text-white/90 drop-shadow-[0_0_24px_rgba(185,239,255,0.7)]" />
              <Waves className="absolute bottom-12 left-1/2 size-32 -translate-x-1/2 text-white/75" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="rounded-[2rem] border border-[#cfe2ea] bg-white p-7 shadow-[0_18px_45px_rgba(11,45,58,0.1)] sm:p-12">
            <p className="text-xl font-semibold leading-9 text-[#365f6c]">
              La Protezione Civile ricorda che i temporali intensi possono
              provocare fenomeni molto localizzati e rapidi, inclusi allagamenti
              improvvisi. Per questo, quando notiamo acqua che non defluisce,
              caditoie bloccate o un sottopasso che si riempie, conviene
              distinguere subito tra emergenza e segnalazione ordinaria.
            </p>

            <div className="mt-9 rounded-3xl border border-red-200 bg-red-50 p-6">
              <div className="flex gap-4">
                <ShieldAlert className="mt-1 size-7 shrink-0 text-red-700" />
                <div>
                  <h2 className="text-xl font-black text-red-950">
                    Se c&apos;e&apos; pericolo, non aspettare
                  </h2>
                  <p className="mt-2 leading-7 text-red-900/80">
                    Persone bloccate, auto ferme nell&apos;acqua, tombini sollevati,
                    sottopassi allagati o acqua che entra in abitazioni e
                    locali: spostati in sicurezza e chiama il 112 o i Vigili
                    del Fuoco. Non attraversare zone allagate a piedi o in auto
                    per fare foto migliori.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 1: capire se e&apos; emergenza
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <Phone className="size-7 text-red-700" />
                <h3 className="mt-4 text-xl font-black text-red-950">Intervento urgente</h3>
                <p className="mt-2 leading-7 text-red-900/80">
                  C&apos;e&apos; rischio per persone, edifici, circolazione o impianti.
                  In questo caso servono soccorsi o messa in sicurezza, non solo
                  una richiesta al Comune.
                </p>
              </div>
              <div className="rounded-3xl border border-[#cfe2ea] bg-[#f0f8fb] p-6">
                <CircleAlert className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Segnalazione ordinaria</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  L&apos;acqua ristagna, una caditoia e&apos; ostruita o un tratto si
                  allaga spesso, ma non ci sono persone in pericolo immediato:
                  segnala a Comune, Polizia Locale o servizio manutenzione.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 2: cosa comunicare
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Una buona segnalazione permette a chi interviene di trovare il
              punto senza interpretazioni. Evita formule generiche come
              &quot;strada allagata&quot;: aggiungi riferimenti concreti e aggiornati.
            </p>
            <ul className="mt-7 space-y-4 text-lg leading-8 text-[#365f6c]">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1.5 size-5 shrink-0 text-[#20825e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-[#eaf7fb] p-6">
              <div className="flex gap-4">
                <Droplets className="mt-1 size-7 shrink-0 text-[#17698b]" />
                <div>
                  <h3 className="text-xl font-black">Foto e video: utili, ma solo da un punto sicuro</h3>
                  <p className="mt-3 text-lg leading-8 text-[#365f6c]">
                    Scatta una foto ampia con incroci, cartelli o edifici
                    riconoscibili. Se riesci senza avvicinarti all&apos;acqua,
                    aggiungi un dettaglio della caditoia ostruita. Evita targhe,
                    volti e interni di abitazioni private quando pubblichi
                    materiale online.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 3: un testo pronto da inviare
            </h2>
            <blockquote className="mt-6 rounded-3xl border-l-4 border-[#17698b] bg-[#f0f8fb] p-6 text-lg leading-8 text-[#294f5e]">
              &quot;Segnalo un allagamento in via [nome], all&apos;altezza del civico
              [numero] / incrocio [riferimento]. Il problema e&apos; stato osservato
              il [data] alle ore [ora]. L&apos;acqua ristagna vicino a una caditoia
              apparentemente ostruita e interessa [marciapiede/corsia/accesso].
              Allego foto scattate da posizione sicura. Chiedo verifica e, se
              necessario, pulizia o messa in sicurezza.&quot;
            </blockquote>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 4: quando il problema si ripete
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Se la stessa strada si allaga a ogni temporale, conserva le
              segnalazioni precedenti, date, foto e risposte ricevute. Un
              problema ricorrente puo&apos; richiedere pulizia periodica delle
              caditoie, verifica delle pendenze o interventi piu&apos; strutturali
              sulla rete di raccolta delle acque.
            </p>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Aggiorna la richiesta solo con elementi nuovi: livello dell&apos;acqua,
              durata, tratto interessato, ostacoli presenti e impatto su
              passaggi pedonali, scuole, fermate o attivita&apos; locali.
            </p>

            <section className="mt-12 rounded-[2rem] bg-[linear-gradient(135deg,#061735,#17698b)] p-7 text-white sm:p-10">
              <MapPinned className="size-9 text-[#b9efff]" />
              <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#b9efff]">
                Segnalazione locale in tempo reale
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Segnalalo anche su Commety
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Dopo aver avvisato i canali competenti, pubblica la posizione
                anche su Commety: chi si trova vicino vede subito il punto
                critico sulla mappa, puo&apos; evitarlo e puo&apos; confermare se la
                situazione e&apos; ancora in corso.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Commety non sostituisce il 112, i Vigili del Fuoco, la
                Protezione Civile o il Comune. E&apos; il livello in piu&apos; che rende
                l&apos;informazione visibile alla comunita&apos;, nel punto esatto in cui
                serve.
              </p>
              <Link
                href="/mappa"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#20a773] px-6 py-3.5 font-black text-white transition hover:bg-[#2bc18a]"
              >
                <Smartphone className="size-5" />
                Segnala su Commety
                <ArrowRight className="size-5" />
              </Link>
            </section>

            <section aria-labelledby="faq-title" className="mt-14 border-t border-[#cfe2ea] pt-12">
              <div className="flex items-center gap-3">
                <CloudRainWind className="size-7 text-[#17698b]" />
                <h2 id="faq-title" className="text-3xl font-black tracking-tight">
                  Domande frequenti
                </h2>
              </div>
              <div className="mt-7 space-y-7">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-xl font-black">{faq.question}</h3>
                    <p className="mt-2 text-lg leading-8 text-[#365f6c]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 border-t border-[#cfe2ea] pt-10">
              <h2 className="text-2xl font-black tracking-tight">Fonti ufficiali</h2>
              <ul className="mt-5 space-y-3 text-[#365f6c]">
                <li>
                  <a className="font-bold text-[#17698b] underline decoration-[#8ac8dc] underline-offset-4" href="https://rischi.protezionecivile.gov.it/it/pagina-base/rischio-meteo-idrogeologico-e-idraulico/" target="_blank" rel="noreferrer">
                    Dipartimento della Protezione Civile
                  </a>{" "}
                  sul rischio meteo-idrogeologico e idraulico.
                </li>
                <li>
                  <a className="font-bold text-[#17698b] underline decoration-[#8ac8dc] underline-offset-4" href="https://domande-risposte.protezionecivile.gov.it/it/approfondimento/rischio-meteo-idro/" target="_blank" rel="noreferrer">
                    Protezione Civile, domande e risposte
                  </a>{" "}
                  su comportamenti corretti, tombini ostruiti e situazioni di
                  pericolo.
                </li>
              </ul>
            </section>

            <div className="mt-10 rounded-3xl border border-[#cfe2ea] bg-[#f4f9fb] p-5 text-sm leading-6 text-[#5c7680]">
              Guida informativa riferita all&apos;Italia. Organizzazione, numeri e
              competenze possono variare per territorio. Per urgenze e pericoli
              immediati usa sempre i canali di emergenza.
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
