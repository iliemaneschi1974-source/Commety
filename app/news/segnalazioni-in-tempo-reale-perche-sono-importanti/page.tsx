import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Clock3,
  MapPinned,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const slug = "/news/segnalazioni-in-tempo-reale-perche-sono-importanti";
const articleUrl = `${siteUrl}${slug}`;
const imageUrl = `${siteUrl}/og-institutional-map.png`;
const publishedAt = "2026-07-23T09:00:00+02:00";

const title = "Segnalazioni in tempo reale: perché sono importanti?";
const description =
  "Scopri perché le segnalazioni in tempo reale aiutano cittadini e comunità a conoscere il territorio, prendere decisioni migliori e condividere informazioni utili con Commety.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "segnalazioni in tempo reale",
    "segnalazioni territorio",
    "mappa segnalazioni",
    "informazioni locali in tempo reale",
    "community locale",
    "cittadinanza attiva digitale",
    "mappa collaborativa",
    "Commety",
    "traffico in tempo reale",
    "eventi locali",
    "segnalazioni meteo",
  ],
  authors: [{ name: "Commety", url: siteUrl }],
  creator: "Commety",
  publisher: "Commety",
  category: "Tecnologia e territorio",
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
    section: "Tecnologia e territorio",
    tags: [
      "segnalazioni in tempo reale",
      "territorio",
      "community",
      "cittadinanza attiva",
      "Commety",
    ],
    images: [
      {
        url: imageUrl,
        width: 1731,
        height: 909,
        alt: "Segnalazioni in tempo reale sulla mappa di Commety",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [imageUrl],
  },
};

const faqs = [
  {
    question: "Che cosa si intende per segnalazione in tempo reale?",
    answer:
      "È un'informazione geolocalizzata e recente, condivisa mentre un fatto è ancora utile per chi si trova o si sta dirigendo in quella zona.",
  },
  {
    question: "Le segnalazioni della community sostituiscono le fonti ufficiali?",
    answer:
      "No. Integrano l'informazione disponibile con osservazioni locali, ma emergenze e situazioni di pericolo devono essere comunicate alle autorità e ai servizi competenti.",
  },
  {
    question: "Come migliora l'affidabilità di una segnalazione su Commety?",
    answer:
      "Gli utenti possono confermare una segnalazione e indicare se è ancora in corso. Contesto, data, posizione e contributi della community aiutano a valutarne attualità e utilità.",
  },
];

export default function RealTimeReportsArticle() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        headline: title,
        description,
        image: [imageUrl],
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        inLanguage: "it-IT",
        articleSection: "Tecnologia e territorio",
        keywords:
          "segnalazioni in tempo reale, territorio, community locale, cittadinanza attiva, mappa collaborativa, Commety",
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
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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
              Commety News · 23 luglio 2026
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Segnalazioni in tempo reale: perché sono importanti?
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/80">
              Un&apos;informazione utile al momento giusto può cambiare un
              percorso, evitare un disagio e rendere una comunità più
              consapevole di ciò che accade sul territorio.
            </p>
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_20px_46px_rgba(0,0,0,0.28)]">
              <Image
                src="/og-institutional-map.png"
                alt="La mappa di Commety con segnalazioni geolocalizzate in tempo reale"
                width={1731}
                height={909}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="rounded-[2rem] border border-[#b9d3f3] bg-white p-7 shadow-[0_18px_45px_rgba(10,43,89,0.12)] sm:p-12">
            <p className="text-xl font-semibold leading-9 text-[#29496f]">
              Il valore di una segnalazione non dipende soltanto da ciò che
              racconta, ma anche da <strong className="text-[#0b2450]">quando</strong> e
              da <strong className="text-[#0b2450]">dove</strong> viene
              condivisa. Un&apos;informazione corretta ma arrivata troppo tardi
              può perdere gran parte della sua utilità; la stessa informazione,
              pubblicata mentre il fatto è ancora in corso, può invece aiutare
              molte persone a scegliere con maggiore consapevolezza.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Dal racconto del territorio a uno strumento decisionale
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">
              Le informazioni locali sono spesso frammentate: una strada
              rallentata viene notata da chi è già in coda, un evento di
              quartiere è conosciuto soprattutto da chi vive nelle vicinanze,
              una mareggiata o un temporale improvviso possono cambiare in
              pochi minuti le condizioni di un luogo. Le segnalazioni in tempo
              reale trasformano queste osservazioni individuali in conoscenza
              condivisa.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              Non si tratta di accumulare notifiche, ma di dare alle persone il
              contesto necessario per decidere: partire più tardi, scegliere
              un percorso diverso, partecipare a un&apos;iniziativa, evitare
              una zona momentaneamente problematica o prestare attenzione a un
              animale smarrito.
            </p>

            <div className="my-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5">
                <Clock3 className="size-7 text-[#1b62ad]" />
                <h3 className="mt-4 text-lg font-black">Tempestività</h3>
                <p className="mt-2 text-sm leading-6 text-[#47658a]">
                  L&apos;informazione arriva quando può ancora incidere su una
                  decisione concreta.
                </p>
              </div>
              <div className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5">
                <MapPinned className="size-7 text-[#1b62ad]" />
                <h3 className="mt-4 text-lg font-black">Contesto locale</h3>
                <p className="mt-2 text-sm leading-6 text-[#47658a]">
                  La posizione collega il fatto al luogo preciso in cui sta
                  avvenendo.
                </p>
              </div>
              <div className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5">
                <UsersRound className="size-7 text-[#1b62ad]" />
                <h3 className="mt-4 text-lg font-black">Intelligenza collettiva</h3>
                <p className="mt-2 text-sm leading-6 text-[#47658a]">
                  Più osservazioni responsabili rendono più leggibile la realtà
                  vicina.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Esempi concreti: quando pochi minuti fanno la differenza
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">
              Immaginiamo un incidente che sta causando rallentamenti vicino a
              un&apos;uscita molto frequentata. Su Commety, una persona può
              inserire una segnalazione geolocalizzata, descrivere la
              situazione e aggiungere una foto pertinente. Chi consulta la
              mappa prima di mettersi in viaggio può vedere il punto
              interessato e valutare un&apos;alternativa.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              Lo stesso principio vale per un temporale intenso, un tratto
              allagato, una manifestazione che modifica temporaneamente la
              viabilità o un evento gratuito appena iniziato. Anche una
              segnalazione dedicata agli animali può essere decisiva: indicare
              rapidamente la zona in cui è stato visto un cane smarrito
              aumenta la possibilità che altre persone prestino attenzione.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              In tutti questi casi Commety non crea il fatto e non pretende di
              sostituire i canali ufficiali. Lo rende visibile sulla mappa,
              vicino alle persone per cui quell&apos;informazione è
              potenzialmente rilevante.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Il ruolo di Commety: una mappa viva, non un flusso indistinto
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">
              In un social network tradizionale, un aggiornamento locale può
              perdersi tra contenuti provenienti da luoghi e momenti diversi.
              Commety parte invece dalla geografia: ogni segnalazione appartiene
              a un punto della mappa e a una categoria. Questo permette di
              leggere il territorio in modo immediato e di concentrarsi su ciò
              che accade davvero nelle vicinanze.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              Una segnalazione Commety può contenere titolo, descrizione, foto
              o video e informazioni sulla posizione. La community può
              confermarla e indicare se la situazione è ancora attiva oppure
              si è conclusa. Il contenuto, quindi, non resta immobile: evolve
              insieme al fatto che rappresenta.
            </p>

            <div className="my-10 rounded-3xl bg-[linear-gradient(135deg,#071a3c,#1b4b87)] p-7 text-white sm:p-9">
              <BadgeCheck className="size-8 text-emerald-300" />
              <h3 className="mt-5 text-2xl font-black">
                Confermare non significa semplicemente mettere “mi piace”
              </h3>
              <p className="mt-3 leading-7 text-white/80">
                Su Commety una conferma ha un significato informativo: comunica
                alla community che un&apos;altra persona riconosce la presenza
                o l&apos;attendibilità della situazione descritta. Il voto
                sull&apos;esistenza permette inoltre di capire se il fatto è
                ancora in corso, evitando che informazioni superate rimangano
                centrali.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Velocità e affidabilità devono crescere insieme
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">
              Pubblicare velocemente non significa rinunciare alla qualità.
              Una piattaforma utile deve ridurre contenuti ingannevoli,
              duplicati, offensivi o privi di contesto. Per questo Commety
              combina moderazione, segnali della community e attenzione alla
              reputazione. Foto e video devono essere pertinenti; volti, targhe
              e dati personali richiedono particolare cautela.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              Anche chi segnala ha una responsabilità: descrivere ciò che ha
              osservato senza enfatizzare, indicare la posizione corretta e non
              esporsi a rischi per raccogliere immagini. Se c&apos;è
              un&apos;emergenza, la priorità resta contattare i servizi
              competenti. La segnalazione pubblica è un supporto informativo,
              non una richiesta di soccorso.
            </p>

            <div className="mt-8 flex gap-4 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <ShieldCheck className="mt-1 size-7 shrink-0 text-amber-700" />
              <div>
                <h3 className="text-lg font-black text-amber-950">
                  Informare senza creare allarme
                </h3>
                <p className="mt-2 leading-7 text-amber-900/80">
                  Una buona segnalazione distingue fatti osservati e opinioni,
                  usa parole proporzionate e tutela la dignità delle persone
                  coinvolte. Essere rapidi è utile; essere accurati è
                  indispensabile.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Un beneficio per cittadini, comunità e territori
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">
              Quando le informazioni sono accessibili e organizzate, il
              territorio diventa più comprensibile. I cittadini possono
              pianificare meglio gli spostamenti; associazioni e comunità
              possono dare visibilità a iniziative utili; chi visita un luogo
              può coglierne condizioni e opportunità; chi vive una difficoltà
              può trovare conferma che non si tratta di un problema isolato.
            </p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">
              Nel tempo, una cultura della segnalazione responsabile può
              rafforzare anche il senso di appartenenza. Osservare il territorio
              non significa soltanto denunciarne i problemi: significa
              riconoscere eventi, servizi, luoghi e gesti positivi che meritano
              attenzione.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Come creare una segnalazione davvero utile
            </h2>
            <ol className="mt-6 space-y-5 text-lg leading-8 text-[#29496f]">
              <li className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1b62ad] text-sm font-black text-white">1</span>
                <span><strong className="text-[#0b2450]">Sii preciso:</strong> indica cosa sta accadendo e seleziona il punto corretto sulla mappa.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1b62ad] text-sm font-black text-white">2</span>
                <span><strong className="text-[#0b2450]">Aggiungi contesto:</strong> spiega direzione, intensità o condizioni utili senza formulare ipotesi non verificate.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1b62ad] text-sm font-black text-white">3</span>
                <span><strong className="text-[#0b2450]">Proteggi la privacy:</strong> evita dati personali e contenuti che possano identificare inutilmente altre persone.</span>
              </li>
              <li className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1b62ad] text-sm font-black text-white">4</span>
                <span><strong className="text-[#0b2450]">Aggiorna la situazione:</strong> conferma le segnalazioni osservate e indica quando non sono più in corso.</span>
              </li>
            </ol>

            <section aria-labelledby="faq-title" className="mt-14 border-t border-[#dbe8f8] pt-12">
              <div className="flex items-center gap-3">
                <BellRing className="size-7 text-[#1b62ad]" />
                <h2 id="faq-title" className="text-3xl font-black tracking-tight">
                  Domande frequenti
                </h2>
              </div>
              <div className="mt-7 space-y-6">
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

            <div className="mt-12 rounded-3xl bg-[#eaf3ff] p-7 sm:p-9">
              <MapPinned className="size-8 text-[#1b62ad]" />
              <h2 className="mt-5 text-2xl font-black">
                Guarda cosa sta succedendo intorno a te
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-[#36577f]">
                Apri la mappa di Commety, esplora le segnalazioni vicine e
                contribuisci con informazioni recenti, precise e rispettose.
              </p>
              <Link
                href="/mappa"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#0F2D5F] px-5 py-3 font-black text-white transition hover:bg-[#1b4b87]"
              >
                Apri la mappa <ArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
