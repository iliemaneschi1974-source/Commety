import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  MapPinned,
  Phone,
  Router,
  Signal,
  Smartphone,
  WifiOff,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const slug = "/news/segnalazioni-guasti-windtre-iliad-tim-fastweb-vodafone";
const articleUrl = `${siteUrl}${slug}`;
const heroImage = `${siteUrl}/news-guasti-rete-hero.png`;
const communityImage = `${siteUrl}/news-guasti-rete-community.png`;
const publishedAt = "2026-07-23T12:00:00+02:00";

const title =
  "Segnalazioni guasti WINDTRE, iliad, TIM, Fastweb e Vodafone: come fare?";
const description =
  "Guida aggiornata per segnalare guasti internet e mobile a WINDTRE, iliad, TIM, Fastweb e Vodafone: numeri utili, app, assistenza e segnalazioni real time su Commety.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "segnalazione guasti WINDTRE",
    "segnalazione guasti iliad",
    "segnalazione guasti TIM",
    "segnalazione guasti Fastweb",
    "segnalazione guasti Vodafone",
    "internet non funziona",
    "rete mobile non funziona",
    "guasto fibra",
    "assenza segnale cellulare",
    "numero assistenza operatori telefonici",
    "guasti rete in tempo reale",
    "Commety",
  ],
  authors: [{ name: "Commety", url: siteUrl }],
  creator: "Commety",
  publisher: "Commety",
  category: "Guide e connettività",
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
    section: "Guide e connettività",
    tags: [
      "guasti rete",
      "WINDTRE",
      "iliad",
      "TIM",
      "Fastweb",
      "Vodafone",
      "assistenza telefonica",
      "Commety",
    ],
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 920,
        alt: "Guasti di rete mobile e internet visualizzati su una mappa",
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
    question: "Come capire se il guasto riguarda solo la mia linea?",
    answer:
      "Riavvia dispositivo e modem, controlla cavi e spie, prova un secondo dispositivo e verifica se altre persone nella stessa zona e con lo stesso operatore riscontrano il problema.",
  },
  {
    question: "Quali dati servono quando si segnala un guasto?",
    answer:
      "Conviene preparare numero o codice della linea, indirizzo interessato, orario di inizio, servizi non disponibili, verifiche già effettuate ed eventuale codice cliente.",
  },
  {
    question: "Una segnalazione su Commety sostituisce quella all'operatore?",
    answer:
      "No. L'operatore deve ricevere la richiesta di assistenza tecnica. Commety serve a informare in tempo reale le persone della zona e a raccogliere conferme locali sul disservizio.",
  },
];

const operators = [
  {
    id: "windtre",
    name: "WINDTRE",
    number: "159",
    summary:
      "Il Servizio Clienti 159 gestisce assistenza e segnalazioni per rete mobile e fissa.",
    steps: [
      "Chiama il 159 e segui il percorso dedicato all'assistenza tecnica.",
      "In alternativa usa l'app o l'Area Clienti WINDTRE e avvia l'assistenza guidata WILL.",
      "Se sei all'estero e hai difficoltà con chiamate, SMS o dati, WINDTRE indica il numero 388 0000159 tramite WhatsApp.",
      "Conserva il codice identificativo della sessione di assistenza comunicato dal servizio clienti.",
    ],
    officialUrl: "https://www.windtre.it/come-contattare-windtre",
  },
  {
    id: "iliad",
    name: "iliad",
    number: "177",
    summary:
      "Il 177 è il canale telefonico ufficiale per assistenza, informazioni e segnalazioni iliad.",
    steps: [
      "Chiama il 177 da una linea funzionante; da rete iliad la chiamata è gratuita.",
      "Per la fibra, entra nell'Area Personale o nell'assistenza iliad e seleziona il percorso dedicato alla linea fissa.",
      "Per il mobile, verifica prima modalità aereo, riavvio, copertura e configurazione dati.",
      "Indica indirizzo o zona, orario di inizio e se il problema riguarda voce, SMS, dati o fibra.",
    ],
    officialUrl: "https://www.iliad.it/contact.html",
  },
  {
    id: "tim",
    name: "TIM",
    number: "187 / 119",
    summary:
      "TIM distingue l'assistenza della linea fissa, al 187, da quella mobile, al 119.",
    steps: [
      "Chiama il 187 per guasti e problemi della linea fissa o fibra.",
      "Chiama il 119 per difficoltà della rete mobile TIM.",
      "Puoi aprire e seguire una richiesta anche dall'app o dall'Area Clienti MyTIM.",
      "L'assistente virtuale Angie, disponibile in MyTIM, può guidare le prime verifiche e l'apertura della segnalazione.",
    ],
    officialUrl: "https://www.tim.it/assistenza/per-la-tua-linea/come-contattare-tim",
  },
  {
    id: "fastweb",
    name: "Fastweb",
    number: "192193",
    summary:
      "Il 192193 è il riferimento Fastweb per assistenza tecnica su rete fissa e mobile dei clienti residenziali.",
    steps: [
      "Accedi a MyFastweb, scegli Assistenza e descrivi il servizio che non funziona.",
      "Chiama il 192193 per richiedere supporto o prenotare il ricontatto.",
      "Fastweb indica anche il numero WhatsApp 375 7836519 per ricevere assistenza.",
      "Controlla nella sezione Le mie richieste lo stato della pratica e conserva il relativo riferimento.",
    ],
    officialUrl: "https://www.fastweb.it/myfastweb/assistenza/guide.php/come-richiedere-assistenza/",
  },
  {
    id: "vodafone",
    name: "Vodafone",
    number: "190",
    summary:
      "Il 190 è il Servizio Clienti Vodafone per problemi e assistenza su servizi fissi e mobili.",
    steps: [
      "Chiama il 190 da un numero Vodafone; il servizio con assistente TOBi è indicato tutti i giorni dalle 8 alle 22.",
      "Da rete fissa o da un altro operatore puoi usare il numero gratuito 800 100 195.",
      "Dall'estero Vodafone indica il +39 349 2000190, attivo dalle 8 alle 22 ora italiana.",
      "Puoi iniziare la diagnosi anche con TOBi dal sito o dall'app My Vodafone e chiedere il passaggio a un operatore quando necessario.",
    ],
    officialUrl: "https://privati.vodafone.it/privati/area-supporto/contattaci",
  },
] as const;

export default function TelecomOutageGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        headline: title,
        description,
        image: [heroImage, communityImage],
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        inLanguage: "it-IT",
        articleSection: "Guide e connettività",
        keywords:
          "guasti WINDTRE, guasti iliad, guasti TIM, guasti Fastweb, guasti Vodafone, assistenza rete, Commety",
        author: { "@type": "Organization", name: "Commety", url: siteUrl },
        publisher: {
          "@type": "Organization",
          name: "Commety",
          url: siteUrl,
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo-commety.png`,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Commety",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "News",
            item: `${siteUrl}/news`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: articleUrl,
          },
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
    <main className="min-h-screen bg-[#f5f9ff] text-[#0b2450]">
      <header className="border-b border-[#dbe8f8] bg-white/90 backdrop-blur">
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
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#234d89] transition hover:bg-[#eaf2ff]"
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

        <section className="bg-[radial-gradient(circle_at_84%_8%,#2a67ae_0%,#0F2D5F_34%,#061735_100%)] px-6 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a9d5ff]">
              Guide Commety · Aggiornata al 23 luglio 2026
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Segnalazioni guasti WINDTRE, iliad, TIM, Fastweb e Vodafone:
              come fare?
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/80">
              Numeri utili, canali ufficiali e verifiche da eseguire quando
              internet, fibra o rete mobile non funzionano. Con un passaggio in
              più: informare in tempo reale anche chi si trova nella stessa zona.
            </p>
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_20px_46px_rgba(0,0,0,0.28)]">
              <Image
                src="/news-guasti-rete-hero.png"
                alt="Una mappa digitale mostra diversi guasti di rete in una città italiana"
                width={1536}
                height={920}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="rounded-[2rem] border border-[#b9d3f3] bg-white p-7 shadow-[0_18px_45px_rgba(10,43,89,0.12)] sm:p-12">
            <p className="text-xl font-semibold leading-9 text-[#29496f]">
              Una connessione che scompare può dipendere dal modem, dallo
              smartphone, dalla singola linea oppure da un guasto esteso nella
              rete dell&apos;operatore. Capire quale scenario si sta
              verificando permette di aprire una segnalazione più completa e
              riduce i passaggi con l&apos;assistenza.
            </p>

            <div className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <div className="flex gap-4">
                <CircleAlert className="mt-1 size-7 shrink-0 text-amber-700" />
                <div>
                  <h2 className="text-xl font-black text-amber-950">
                    Numeri verificati il 23 luglio 2026
                  </h2>
                  <p className="mt-2 leading-7 text-amber-900/80">
                    Orari, costi e modalità possono cambiare. Prima di chiamare
                    consulta sempre la pagina ufficiale dell&apos;operatore,
                    collegata in ogni capitolo di questa guida.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Prima di contattare l&apos;operatore: cinque controlli rapidi
            </h2>
            <ol className="mt-7 space-y-5 text-lg leading-8 text-[#29496f]">
              {[
                ["Verifica l'estensione", "Controlla se il problema riguarda un solo dispositivo oppure tutti quelli collegati alla stessa rete."],
                ["Riavvia con ordine", "Attiva e disattiva la modalità aereo sul telefono; per la linea fissa spegni il modem, attendi circa un minuto e riaccendilo."],
                ["Controlla spie e cavi", "Verifica alimentazione, collegamenti e spie Internet, fibra o LOS senza scollegare componenti che non conosci."],
                ["Escludi la configurazione", "Prova un secondo sito o servizio, disattiva temporaneamente eventuali VPN e verifica che i dati mobili siano abilitati."],
                ["Annota i dettagli", "Segna orario di inizio, indirizzo, servizi coinvolti e messaggi di errore: saranno utili all'assistenza."],
              ].map(([heading, text], index) => (
                <li key={heading} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1b62ad] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <span>
                    <strong className="text-[#0b2450]">{heading}:</strong>{" "}
                    {text}
                  </span>
                </li>
              ))}
            </ol>

            <nav aria-label="Operatori trattati" className="mt-10 rounded-3xl bg-[#eaf3ff] p-6">
              <p className="font-black text-[#0b2858]">Vai direttamente al tuo operatore</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {operators.map((operator) => (
                  <a
                    key={operator.id}
                    href={`#${operator.id}`}
                    className="rounded-full border border-[#b9d3f3] bg-white px-4 py-2 text-sm font-bold text-[#1b62ad] transition hover:border-[#77a8df]"
                  >
                    {operator.name}
                  </a>
                ))}
              </div>
            </nav>

            {operators.map((operator, index) => (
              <section
                key={operator.id}
                id={operator.id}
                className="scroll-mt-6 border-b border-[#dbe8f8] py-12 last:border-b-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2867ad]">
                      {index + 1}. Assistenza operatore
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                      Come segnalare un guasto {operator.name}
                    </h2>
                  </div>
                  <div className="inline-flex items-center gap-3 rounded-2xl bg-[#0F2D5F] px-5 py-3 text-white">
                    <Phone className="size-5 text-[#a9d5ff]" />
                    <span>
                      <span className="block text-xs font-bold uppercase tracking-wider text-white/60">
                        Numero utile
                      </span>
                      <strong className="text-xl">{operator.number}</strong>
                    </span>
                  </div>
                </div>
                <p className="mt-5 text-lg leading-8 text-[#29496f]">
                  {operator.summary}
                </p>
                <ul className="mt-6 space-y-4">
                  {operator.steps.map((step) => (
                    <li key={step} className="flex gap-3 text-lg leading-8 text-[#29496f]">
                      <CheckCircle2 className="mt-1.5 size-5 shrink-0 text-emerald-600" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={operator.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-black text-[#1b62ad] transition hover:text-[#0F2D5F]"
                >
                  Consulta l&apos;assistenza ufficiale {operator.name}
                  <ArrowRight className="size-4" />
                </a>
              </section>
            ))}

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Cosa comunicare per aprire una segnalazione efficace
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ["Linea interessata", "Numero telefonico, codice cliente o identificativo della linea fissa."],
                ["Luogo preciso", "Indirizzo per la rete fissa; comune, quartiere o strada per la rete mobile."],
                ["Tipo di guasto", "Assenza totale, lentezza, chiamate impossibili, SMS, dati mobili o disconnessioni."],
                ["Tempi e verifiche", "Quando è iniziato il problema e quali riavvii o prove sono già stati eseguiti."],
              ].map(([heading, text]) => (
                <div key={heading} className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5">
                  <h3 className="font-black">{heading}</h3>
                  <p className="mt-2 leading-7 text-[#47658a]">{text}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Segnalazione tecnica e reclamo non sono la stessa cosa
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">
              La prima comunicazione serve ad aprire una pratica tecnica e
              consentire all&apos;operatore di diagnosticare il guasto. Se il
              problema persiste, la pratica viene chiusa senza soluzione o vuoi
              contestare la gestione, puoi valutare un reclamo formale secondo
              le modalità indicate nella carta dei servizi del tuo operatore.
              Conserva sempre codice pratica, date dei contatti e risposte
              ricevute.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              Per misurare in modo certificato le prestazioni della rete fissa
              esistono inoltre gli strumenti messi a disposizione da AGCOM. Una
              semplice misurazione online può essere utile per una prima
              diagnosi, ma non equivale automaticamente a una prova formale.
            </p>

            <figure className="my-12 overflow-hidden rounded-[1.75rem] border border-[#cfe1f6] bg-[#eaf3ff]">
              <Image
                src="/news-guasti-rete-community.png"
                alt="Persone che condividono in tempo reale segnalazioni locali sui guasti di rete"
                width={1536}
                height={920}
                className="h-auto w-full"
              />
              <figcaption className="p-5 text-sm leading-6 text-[#47658a] sm:px-7">
                Una segnalazione locale condivisa permette di capire più
                rapidamente se il disservizio coinvolge altre persone nella
                stessa area.
              </figcaption>
            </figure>

            <section className="rounded-[2rem] bg-[linear-gradient(135deg,#071a3c,#1b4b87)] p-7 text-white sm:p-10">
              <MapPinned className="size-9 text-emerald-300" />
              <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#a9d5ff]">
                Guasti di zona in real time
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Segnalare all&apos;operatore è essenziale. Avvisare la zona è
                altrettanto utile.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Quando più persone perdono contemporaneamente copertura mobile
                o connessione internet, sapere che il problema è diffuso evita
                tentativi inutili sul modem e aiuta famiglie, professionisti e
                attività locali a organizzarsi. Una mappa aggiornata in tempo
                reale rende visibile il disservizio esattamente dove sta
                accadendo.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Su Commety puoi pubblicare una segnalazione di guasto della rete
                di zona in un click, indicare la posizione e permettere alla
                community di confermare se il problema è ancora in corso. La
                segnalazione su Commety non sostituisce l&apos;assistenza
                tecnica dell&apos;operatore: la completa con un&apos;informazione
                locale, immediata e condivisa.
              </p>
              <Link
                href="/mappa"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-black text-white transition hover:bg-emerald-400"
              >
                <Signal className="size-5" />
                Segnala un guasto su Commety
                <ArrowRight className="size-5" />
              </Link>
            </section>

            <section aria-labelledby="faq-title" className="mt-14 border-t border-[#dbe8f8] pt-12">
              <div className="flex items-center gap-3">
                <WifiOff className="size-7 text-[#1b62ad]" />
                <h2 id="faq-title" className="text-3xl font-black tracking-tight">
                  Domande frequenti sui guasti di rete
                </h2>
              </div>
              <div className="mt-7 space-y-7">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-xl font-black">{faq.question}</h3>
                    <p className="mt-2 text-lg leading-8 text-[#29496f]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[#5d7594]">
              <Router className="size-5" />
              <span>Guida informativa, non affiliata agli operatori citati.</span>
              <Smartphone className="ml-auto size-5" />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
