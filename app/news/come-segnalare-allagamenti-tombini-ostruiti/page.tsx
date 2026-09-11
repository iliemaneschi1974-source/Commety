import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Building2,
  CarFront,
  Camera,
  CheckCircle2,
  CircleAlert,
  CloudRainWind,
  Droplets,
  FileCheck2,
  MapPinned,
  Phone,
  ShieldAlert,
  Smartphone,
  Waves,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const slug = "/news/come-segnalare-allagamenti-tombini-ostruiti";
const articleUrl = `${siteUrl}${slug}`;
const heroImage = `${siteUrl}/news-allagamenti-tombini-cover.png`;
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
        width: 1800,
        height: 1013,
        alt: "Una persona segnala da un marciapiede una caditoia ostruita dopo un temporale",
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
  {
    question: "Devo attraversare l'acqua per controllare un tombino?",
    answer:
      "No. Non entrare nell'acqua, non rimuovere griglie o foglie con le mani e non avvicinarti a tombini sollevati. L'acqua puo' nascondere buche, cavi, ostacoli o corrente: comunica quello che osservi da una posizione protetta.",
  },
  {
    question: "Come aggiorno una segnalazione quando l'acqua si ritira?",
    answer:
      "Indica l'orario in cui la situazione e' cambiata e aggiungi soltanto informazioni nuove, come strada riaperta, acqua ancora presente o caditoia nuovamente visibile. Su Commety puoi aggiornare la segnalazione per aiutare chi consulta la mappa.",
  },
];

const checklist = [
  "Posizione esatta: via, civico, incrocio, quartiere o coordinate.",
  "Tipo di problema: strada allagata, sottopasso, caditoia ostruita, tombino sollevato o acqua che entra in un edificio.",
  "Livello apparente dell'acqua e rapidita' con cui aumenta.",
  "Presenza di persone, veicoli bloccati, cantieri, scuole, negozi o accessi impediti.",
  "Foto ampia del punto e, se sicuro, dettaglio dell'ostruzione.",
  "Data, ora e condizioni meteo al momento della segnalazione.",
  "Eventuali cambiamenti: acqua in aumento, strada chiusa, acqua ritirata o ostacolo rimosso.",
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
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_20px_46px_rgba(0,0,0,0.28)]">
              <Image
                src="/news-allagamenti-tombini-cover.png"
                alt="Una persona segnala da un marciapiede una caditoia ostruita dopo un temporale"
                width={1800}
                height={1013}
                priority
                className="h-auto w-full"
              />
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

            <section className="mt-10 rounded-3xl border border-[#cfe2ea] bg-[#f0f8fb] p-6 sm:p-8">
              <div className="flex gap-4">
                <AlertTriangle className="mt-1 size-7 shrink-0 text-[#17698b]" />
                <div>
                  <h2 className="text-2xl font-black">Prima di segnalare: quattro cose da non fare</h2>
                  <ul className="mt-4 space-y-3 leading-7 text-[#365f6c]">
                    <li>Non attraversare un sottopasso o una strada allagata, nemmeno se l&apos;acqua sembra bassa.</li>
                    <li>Non spostare griglie, tombini, transenne o altri elementi della strada.</li>
                    <li>Non fermarti in doppia fila o in carreggiata per registrare un video.</li>
                    <li>Non condividere informazioni non verificate: indica sempre cosa hai visto, dove e quando.</li>
                  </ul>
                </div>
              </div>
            </section>

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
              Capitolo 2: a chi inviare la segnalazione
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Quando non e&apos; necessaria una chiamata di emergenza, il primo
              riferimento e&apos; di solito il Comune: il sito istituzionale puo&apos;
              indicare un portale per le segnalazioni, l&apos;URP, la Polizia Locale
              o il gestore del servizio di manutenzione. In alcune citta&apos; il
              servizio idrico o il gestore della strada ha un canale dedicato.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#cfe2ea] bg-white p-6">
                <Building2 className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Comune e manutenzione</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  Per caditoie sporche, ristagni e problemi ricorrenti su strade
                  comunali, usa il canale ufficiale e conserva protocollo o
                  conferma di invio.
                </p>
              </div>
              <div className="rounded-3xl border border-[#cfe2ea] bg-white p-6">
                <Phone className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Polizia Locale e soccorsi</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  Se la viabilita&apos; e&apos; compromessa o il pericolo cresce,
                  contatta chi puo&apos; disporre una messa in sicurezza. Per le
                  emergenze usa il 112.
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-[#5c7680]">
              Se non sai chi gestisce il tratto, invia posizione e riferimenti
              al Comune o alla Polizia Locale e chiedi il canale competente.
              Un solo invio completo e&apos; piu&apos; utile di molte segnalazioni
              duplicate e senza localizzazione.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 3: cosa comunicare
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
              Capitolo 4: foto, video e posizione senza esporsi
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Una segnalazione efficace non ha bisogno di immagini spettacolari:
              ha bisogno di elementi che permettano di capire il punto. Una
              foto panoramica, scattata dal marciapiede, con un incrocio o un
              numero civico vicino e&apos; spesso piu&apos; utile di un primo piano.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#cfe2ea] bg-[#f7fbfc] p-6">
                <Camera className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Per documentare bene</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  Inquadra via, incrocio o punto di riferimento; registra data
                  e ora; aggiungi un dettaglio dell&apos;ostruzione solo se resta
                  possibile farlo da terreno asciutto e sicuro.
                </p>
              </div>
              <div className="rounded-3xl border border-[#cfe2ea] bg-[#f7fbfc] p-6">
                <ShieldAlert className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Per proteggere le persone</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  Non mostrare volti, targhe, interni privati o dati personali.
                  Non filmare mentre guidi e non chiedere ad altri di avvicinarsi
                  all&apos;acqua per ottenere immagini migliori.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 5: un testo pronto da inviare
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
              Capitolo 6: muoversi a piedi o in auto durante un allagamento
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Le condizioni possono cambiare in pochi minuti. Se devi
              spostarti, scegli percorsi alternativi e segui le chiusure o le
              indicazioni ufficiali. L&apos;acqua rende difficile vedere buche,
              marciapiedi danneggiati, tombini aperti e ostacoli sotto la
              superficie.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#cfe2ea] bg-white p-6">
                <CarFront className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Se sei in auto</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  Non entrare in sottopassi o tratti con acqua in movimento. Se
                  trovi una strada chiusa, non aggirare le transenne: torna
                  indietro e scegli un percorso sicuro.
                </p>
              </div>
              <div className="rounded-3xl border border-[#cfe2ea] bg-white p-6">
                <Waves className="size-7 text-[#17698b]" />
                <h3 className="mt-4 text-xl font-black">Se sei a piedi</h3>
                <p className="mt-2 leading-7 text-[#4b6d78]">
                  Evita passaggi in discesa, argini, sottopassi e zone dove non
                  distingui il fondo. Cerca un luogo riparato e informa i
                  soccorsi se qualcuno non riesce a uscire in sicurezza.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 7: quando il problema si ripete
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f6c]">
              Se la stessa strada si allaga a ogni temporale, conserva le
              segnalazioni precedenti, date, foto e risposte ricevute. Un
              problema ricorrente puo&apos; richiedere pulizia periodica delle
              caditoie, verifica delle pendenze o interventi piu&apos; strutturali
              sulla rete di raccolta delle acque.
            </p>
            <div className="mt-7 rounded-3xl border border-[#cfe2ea] bg-[#f7fbfc] p-6">
              <div className="flex gap-4">
                <FileCheck2 className="mt-1 size-7 shrink-0 text-[#17698b]" />
                <div>
                  <h3 className="text-xl font-black">Come fare un seguito utile</h3>
                  <p className="mt-2 leading-7 text-[#4b6d78]">
                    Cita il numero della prima pratica, indica se il rischio e&apos;
                    cambiato e allega solo nuove foto o orari. Quando il punto
                    torna praticabile, aggiorna anche Commety: una mappa utile
                    ha bisogno sia degli avvisi sia delle conferme di rientro.
                  </p>
                </div>
              </div>
            </div>
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
