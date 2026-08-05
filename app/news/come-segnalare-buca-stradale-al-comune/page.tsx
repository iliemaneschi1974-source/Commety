import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Camera,
  CarFront,
  CheckCircle2,
  CircleHelp,
  FileCheck2,
  MapPinned,
  Phone,
  Route,
  ShieldAlert,
  Smartphone,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const slug = "/news/come-segnalare-buca-stradale-al-comune";
const articleUrl = `${siteUrl}${slug}`;
const heroImage = `${siteUrl}/news-buca-stradale-hero.jpg`;
const publishedAt = "2026-08-05T12:00:00+02:00";

const title =
  "Come segnalare una buca stradale al Comune: procedura, numeri utili e risarcimento";
const description =
  "Guida completa per segnalare una buca stradale: cosa fotografare, chi contattare, come individuare l'ente competente e cosa documentare in caso di danni.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "come segnalare una buca stradale",
    "segnalare buca al Comune",
    "buca stradale chi chiamare",
    "buca pericolosa numero da chiamare",
    "danni auto buca stradale",
    "risarcimento buca stradale",
    "segnalazione dissesto stradale",
    "strada dissestata",
    "manutenzione stradale Comune",
    "segnalazione buca Commety",
  ],
  authors: [{ name: "Commety", url: siteUrl }],
  creator: "Commety",
  publisher: "Commety",
  category: "Sicurezza stradale e territorio",
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
    section: "Sicurezza stradale e territorio",
    tags: [
      "buche stradali",
      "sicurezza stradale",
      "segnalazioni al Comune",
      "dissesto stradale",
      "Commety",
    ],
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 920,
        alt: "Una cittadina fotografa in sicurezza una buca stradale dal marciapiede",
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
    question: "Chi bisogna chiamare per segnalare una buca stradale?",
    answer:
      "Per una strada comunale usa il servizio segnalazioni o la Polizia Locale del Comune. Se esiste un pericolo immediato per la circolazione chiama il 112. Per una strada gestita da Anas è disponibile Pronto Anas 800 841 148, attivo tutti i giorni 24 ore su 24 per emergenze e pericoli.",
  },
  {
    question: "Quali informazioni servono per una segnalazione efficace?",
    answer:
      "Indica posizione precisa, strada e direzione di marcia, data e ora, dimensioni apparenti, condizioni di luce e visibilità. Aggiungi foto d'insieme e di dettaglio scattate senza entrare in carreggiata.",
  },
  {
    question: "Il Comune è sempre responsabile dei danni causati da una buca?",
    answer:
      "No. La responsabilità e l'eventuale risarcimento dipendono dal caso concreto, dall'ente che custodisce la strada, dalla dinamica e dalle prove disponibili. È opportuno conservare tutta la documentazione e chiedere assistenza professionale quando il danno è rilevante.",
  },
  {
    question: "Una segnalazione su Commety sostituisce quella all'ente competente?",
    answer:
      "No. Commety rende il problema visibile in tempo reale alla comunità e può aiutare a raccogliere conferme, ma per richiedere un intervento ufficiale occorre utilizzare anche i canali dell'ente proprietario o gestore della strada.",
  },
];

const checklist = [
  "Nome della strada, numero civico vicino o coordinate precise.",
  "Direzione di marcia e corsia interessata, se rilevanti.",
  "Data e ora dell'osservazione.",
  "Foto panoramica che renda riconoscibile il luogo.",
  "Foto ravvicinata, solo se realizzabile senza entrare in strada.",
  "Dimensioni stimate e presenza di acqua, ghiaia o asfalto sollevato.",
  "Pericoli particolari per pedoni, ciclisti, motociclisti o automobilisti.",
];

export default function PotholeGuidePage() {
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
        articleSection: "Sicurezza stradale e territorio",
        keywords:
          "buca stradale, dissesto stradale, segnalazione al Comune, sicurezza stradale, risarcimento, Commety",
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
    <main className="min-h-screen bg-[#f6f8fc] text-[#0b2858]">
      <header className="border-b border-[#d8e4f2] bg-white/90 backdrop-blur">
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
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#2867ad] transition hover:bg-[#edf5ff]"
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

        <section className="bg-[radial-gradient(circle_at_84%_8%,#2878bd_0%,#0F2D5F_38%,#061735_100%)] px-6 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a9d5ff]">
              Guide Commety · 5 agosto 2026
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Come segnalare una buca stradale al Comune
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/80">
              Una guida pratica per capire chi contattare, raccogliere le
              informazioni giuste e documentare correttamente un eventuale
              danno, senza esporsi a nuovi pericoli.
            </p>
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_20px_46px_rgba(0,0,0,0.3)]">
              <Image
                src="/news-buca-stradale-hero.jpg"
                alt="Una cittadina fotografa una buca stradale restando sul marciapiede"
                width={1536}
                height={920}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="rounded-[2rem] border border-[#d5e1ef] bg-white p-7 shadow-[0_18px_45px_rgba(11,40,88,0.1)] sm:p-12">
            <p className="text-xl font-semibold leading-9 text-[#3d5f87]">
              Una buca non è soltanto un disagio: può far perdere il controllo a
              una bicicletta o a una moto, danneggiare un veicolo e rendere
              pericoloso il passaggio di pedoni e persone con mobilità ridotta.
              Una segnalazione precisa permette al gestore della strada di
              individuare più rapidamente il punto e valutarne la priorità.
            </p>

            <div className="mt-9 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-4">
                <ShieldAlert className="mt-1 size-7 shrink-0 text-amber-700" />
                <div>
                  <h2 className="text-xl font-black text-amber-950">
                    Prima regola: non entrare in carreggiata per fare una foto
                  </h2>
                  <p className="mt-2 leading-7 text-amber-900/80">
                    Non fermarti in un punto vietato, non attraversare per
                    misurare la buca e non collocare oggetti improvvisati sulla
                    strada. Se il dissesto crea un pericolo immediato, spostati
                    in sicurezza e chiama il 112 o l&apos;organo di polizia competente.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 1: valutare l&apos;urgenza
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3d5f87]">
              Una piccola irregolarità ai margini della strada e una voragine in
              una corsia trafficata non richiedono lo stesso canale. Prima di
              tutto osserva il contesto da una posizione protetta.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-red-200 bg-red-50 p-6">
                <AlertTriangle className="size-7 text-red-700" />
                <h3 className="mt-4 text-xl font-black text-red-950">Pericolo immediato</h3>
                <p className="mt-2 leading-7 text-red-900/80">
                  Buca profonda in piena corsia, ostacolo improvviso, incidente,
                  scarsa visibilità o rischio concreto per la circolazione:
                  chiama il 112 e fornisci posizione e direzione di marcia.
                </p>
              </div>
              <div className="rounded-3xl border border-[#c9dbef] bg-[#f2f7fd] p-6">
                <FileCheck2 className="size-7 text-[#2867ad]" />
                <h3 className="mt-4 text-xl font-black">Segnalazione ordinaria</h3>
                <p className="mt-2 leading-7 text-[#527093]">
                  Se non esiste un&apos;emergenza, usa il portale, l&apos;app, l&apos;URP
                  o il servizio manutenzione dell&apos;ente competente e conserva
                  il numero di protocollo o di pratica.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 2: capire chi gestisce la strada
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3d5f87]">
              Il destinatario corretto dipende dall&apos;ente proprietario o dal
              concessionario. Il Codice della strada attribuisce al gestore i
              compiti di manutenzione, controllo tecnico e segnaletica. Non è
              quindi sufficiente sapere in quale Comune ci troviamo.
            </p>
            <div className="mt-7 space-y-4">
              {[
                ["Strada comunale", "Comune, Polizia Locale, URP o servizio manutenzione indicato sul sito istituzionale."],
                ["Strada provinciale o metropolitana", "Provincia o Città metropolitana competente; verifica la sigla SP e il tratto indicato."],
                ["Strada regionale", "Regione o soggetto gestore incaricato, secondo l'organizzazione territoriale."],
                ["Strada statale Anas", "Pronto Anas 800 841 148, attivo h24 per informazioni di viabilità, emergenze e segnalazioni di pericolo."],
                ["Autostrada", "Concessionario autostradale indicato sui cartelli e sui canali ufficiali di assistenza del tratto."],
              ].map(([heading, text]) => (
                <div key={heading} className="flex gap-4 rounded-3xl border border-[#d5e1ef] p-5">
                  <Route className="mt-1 size-6 shrink-0 text-[#2867ad]" />
                  <div>
                    <h3 className="font-black">{heading}</h3>
                    <p className="mt-1 leading-7 text-[#527093]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-[#647b98]">
              Se non riesci a identificare il gestore, invia la posizione al
              Comune o alla Polizia Locale e chiedi l&apos;inoltro o l&apos;indicazione
              dell&apos;ente competente. Evita di duplicare decine di richieste
              identiche a uffici diversi.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 3: come creare una segnalazione completa
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3d5f87]">
              Scrivere soltanto “c&apos;è una buca” costringe l&apos;ufficio a chiedere
              altri dati. Una segnalazione utile deve rendere il punto
              identificabile anche a chi non conosce la zona.
            </p>
            <ul className="mt-7 space-y-4 text-lg leading-8 text-[#3d5f87]">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-1.5 size-5 shrink-0 text-[#25875e]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-3xl bg-[#eef6ff] p-6">
              <div className="flex gap-4">
                <Camera className="mt-1 size-7 shrink-0 text-[#2867ad]" />
                <div>
                  <h3 className="text-xl font-black">Come fotografare bene la buca</h3>
                  <p className="mt-3 text-lg leading-8 text-[#3d5f87]">
                    Scatta prima una foto ampia con edifici, incroci o cartelli
                    riconoscibili, poi un dettaglio con lo zoom. Non usare una
                    persona o un oggetto collocato sulla strada come riferimento
                    di misura. Non fotografare mentre guidi e oscura targhe o
                    volti se il materiale viene pubblicato online.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 4: un esempio di testo pronto
            </h2>
            <blockquote className="mt-6 rounded-3xl border-l-4 border-[#2b78bd] bg-[#f2f7fd] p-6 text-lg leading-8 text-[#294e78]">
              “Segnalo una buca sul manto stradale in via [nome], all&apos;altezza
              del civico [numero], nella corsia in direzione [direzione]. È
              stata osservata il [data] alle ore [ora]. Il dissesto interessa
              la traiettoria di biciclette e motocicli ed è poco visibile con
              la pioggia. Allego una foto d&apos;insieme e una di dettaglio scattate
              dal marciapiede. Chiedo verifica e messa in sicurezza.”
            </blockquote>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 5: cosa fare se la buca ha causato un danno
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3d5f87]">
              Se hai subito un danno, la priorità resta la sicurezza. Fermati
              soltanto dove consentito, verifica le condizioni delle persone e
              chiama i soccorsi in caso di feriti o pericolo. Non continuare a
              viaggiare se pneumatici, cerchi, sospensioni o sterzo potrebbero
              essere compromessi.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                [CarFront, "Documenta la dinamica", "Annota luogo, ora, direzione e condizioni meteo. Fotografa danno e strada solo da una posizione sicura."],
                [Phone, "Richiedi un accertamento", "Quando necessario contatta la Polizia Locale o l'organo competente e conserva gli estremi dell'intervento."],
                [FileCheck2, "Conserva ogni documento", "Preventivi, fatture, referti, ricevute del soccorso stradale, fotografie originali e nominativi dei testimoni."],
                [CircleHelp, "Valuta assistenza", "L'eventuale responsabilità non è automatica: per danni importanti rivolgiti alla tua assicurazione o a un professionista."],
              ].map(([Icon, heading, text]) => (
                <div key={String(heading)} className="rounded-3xl border border-[#d5e1ef] bg-[#f8fbff] p-6">
                  <Icon className="size-7 text-[#2867ad]" />
                  <h3 className="mt-4 text-xl font-black">{String(heading)}</h3>
                  <p className="mt-2 leading-7 text-[#527093]">{String(text)}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg leading-8 text-[#3d5f87]">
              L&apos;articolo 2051 del Codice civile disciplina il danno cagionato
              da cose in custodia, ma l&apos;esito di una richiesta dipende dalle
              circostanze concrete e dalle prove. Questa guida non sostituisce
              una valutazione legale né garantisce il riconoscimento di un
              risarcimento.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 6: seguire la segnalazione
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#3d5f87]">
              Salva conferma di invio, protocollo o numero di pratica. Se il
              problema resta invariato, aggiorna la richiesta citando il primo
              invio e allegando soltanto elementi nuovi. Se invece la buca è
              stata transennata o riparata, evita nuove segnalazioni e aggiorna
              lo stato dove il servizio lo consente.
            </p>

            <section className="mt-12 rounded-[2rem] bg-[linear-gradient(135deg,#061735,#1762a8)] p-7 text-white sm:p-10">
              <MapPinned className="size-9 text-[#a9d5ff]" />
              <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#a9d5ff]">
                Informazione locale in tempo reale
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Segnala la buca anche su Commety
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Dopo aver attivato il canale ufficiale, puoi pubblicare la
                posizione su Commety in un click. Le persone vicine vedono il
                pericolo sulla mappa, possono confermarne la presenza e sapere
                quando la situazione cambia.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Commety non sostituisce il 112, la Polizia Locale o l&apos;ente
                proprietario della strada: completa la segnalazione istituzionale
                con un&apos;informazione geolocalizzata e utile alla comunità.
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

            <section aria-labelledby="faq-title" className="mt-14 border-t border-[#d5e1ef] pt-12">
              <div className="flex items-center gap-3">
                <CircleHelp className="size-7 text-[#2867ad]" />
                <h2 id="faq-title" className="text-3xl font-black tracking-tight">
                  Domande frequenti
                </h2>
              </div>
              <div className="mt-7 space-y-7">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-xl font-black">{faq.question}</h3>
                    <p className="mt-2 text-lg leading-8 text-[#3d5f87]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 border-t border-[#d5e1ef] pt-10">
              <h2 className="text-2xl font-black tracking-tight">Fonti ufficiali</h2>
              <ul className="mt-5 space-y-3 text-[#3d5f87]">
                <li>
                  <a className="font-bold text-[#2867ad] underline decoration-[#8db8e2] underline-offset-4" href="https://aci.gov.it/codice-della-strada/art-14/" target="_blank" rel="noreferrer">
                    ACI — Codice della strada, articolo 14
                  </a>{" "}
                  sui compiti degli enti proprietari delle strade.
                </li>
                <li>
                  <a className="font-bold text-[#2867ad] underline decoration-[#8db8e2] underline-offset-4" href="https://aci.gov.it/codice-della-strada/art-161/" target="_blank" rel="noreferrer">
                    ACI — Codice della strada, articolo 161
                  </a>{" "}
                  sulla segnalazione di pericoli e intralci.
                </li>
                <li>
                  <a className="font-bold text-[#2867ad] underline decoration-[#8db8e2] underline-offset-4" href="https://www.stradeanas.it/it/contatti/servizio-clienti" target="_blank" rel="noreferrer">
                    Anas — Servizio Clienti Pronto Anas
                  </a>{" "}
                  per recapiti e segnalazioni sulle strade gestite da Anas.
                </li>
              </ul>
            </section>

            <div className="mt-10 rounded-3xl border border-[#d5e1ef] bg-[#f6f8fc] p-5 text-sm leading-6 text-[#647b98]">
              Guida informativa riferita all&apos;Italia. Canali e competenze possono
              variare per territorio. Verifica sempre i recapiti ufficiali
              dell&apos;ente proprietario o gestore della strada. Per urgenze e
              pericoli immediati usa il 112.
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
