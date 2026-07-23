import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CircleAlert,
  FileText,
  MapPinned,
  PawPrint,
  Phone,
  ShieldAlert,
  Stethoscope,
  Trees,
} from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const slug = "/news/cosa-fare-animale-abbandonato-o-maltrattato";
const articleUrl = `${siteUrl}${slug}`;
const heroImage = `${siteUrl}/news-animale-abbandonato-hero.png`;
const rescueImage = `${siteUrl}/news-animale-soccorso-veterinario.png`;
const publishedAt = "2026-07-23T16:00:00+02:00";

const title = "Cosa fare se vediamo un animale abbandonato o maltrattato";
const description =
  "Guida pratica per soccorrere e segnalare in Italia un animale abbandonato, ferito o maltrattato: numeri utili, ASL veterinaria, Forze dell'ordine, 112, 115 e Commety.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "animale abbandonato cosa fare",
    "animale maltrattato cosa fare",
    "numero da chiamare animale abbandonato",
    "segnalare maltrattamento animali",
    "cane abbandonato",
    "gatto ferito",
    "soccorso animali",
    "servizio veterinario ASL",
    "112 maltrattamento animali",
    "115 soccorso animali",
    "CRAS animale selvatico",
    "segnalazione animali Commety",
  ],
  authors: [{ name: "Commety", url: siteUrl }],
  creator: "Commety",
  publisher: "Commety",
  category: "Animali e territorio",
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
    section: "Animali e territorio",
    tags: [
      "animali abbandonati",
      "maltrattamento animali",
      "soccorso animali",
      "ASL veterinaria",
      "Commety",
    ],
    images: [
      {
        url: heroImage,
        width: 1536,
        height: 920,
        alt: "Una persona presta assistenza in sicurezza a un cane abbandonato",
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
    question: "Chi devo chiamare se trovo un cane abbandonato?",
    answer:
      "Segnala il ritrovamento al Servizio veterinario dell'ASL competente o a una Forza di Polizia. Se l'animale crea un pericolo immediato sulla strada, chiama subito il 112 o la Polizia Stradale al 113.",
  },
  {
    question: "Posso portare subito a casa un animale trovato?",
    answer:
      "È meglio denunciare prima il ritrovamento alle autorità competenti, affinché possano verificare microchip, proprietario e procedura di presa in carico. Non presumere automaticamente che un animale vagante sia abbandonato.",
  },
  {
    question: "Come si denuncia un maltrattamento di animali?",
    answer:
      "Se il maltrattamento è in corso o l'animale è in pericolo immediato chiama il 112. Negli altri casi presenta una segnalazione o denuncia a una Forza di Polizia, fornendo luogo, tempi, descrizione, eventuali testimoni e materiale acquisito lecitamente.",
  },
  {
    question: "La segnalazione su Commety sostituisce la chiamata alle autorità?",
    answer:
      "No. Prima vanno contattati i soccorsi, il Servizio veterinario ASL o le Forze dell'ordine. Commety può poi rendere visibile in tempo reale la presenza dell'animale e aiutare la comunità locale a prestare attenzione.",
  },
];

const emergencyContacts = [
  {
    number: "112",
    title: "Emergenza e Forze dell’ordine",
    text: "Per maltrattamento in corso, abbandono appena osservato o pericolo immediato per l’animale o le persone.",
  },
  {
    number: "115",
    title: "Vigili del Fuoco",
    text: "Per un soccorso tecnico urgente: animale bloccato su tetti, alberi, cunicoli o in luoghi non raggiungibili in sicurezza.",
  },
  {
    number: "113",
    title: "Polizia di Stato",
    text: "Indicata anche dalla guida del Ministero della Salute per un animale vagante sulla sede stradale o vicino a essa.",
  },
] as const;

export default function AnimalRescueGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${articleUrl}#article`,
        headline: title,
        description,
        image: [heroImage, rescueImage],
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        inLanguage: "it-IT",
        articleSection: "Animali e territorio",
        keywords:
          "animale abbandonato, animale maltrattato, soccorso animali, ASL veterinaria, 112, 115, Commety",
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
    <main className="min-h-screen bg-[#f7faf6] text-[#153724]">
      <header className="border-b border-[#dce9dc] bg-white/90 backdrop-blur">
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
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#286342] transition hover:bg-[#edf7ef]"
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

        <section className="bg-[radial-gradient(circle_at_84%_8%,#387457_0%,#123e2c_36%,#071f18_100%)] px-6 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b8edca]">
              Guide Commety · Aggiornata al 23 luglio 2026
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">
              Cosa fare se vediamo un animale abbandonato o maltrattato
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-white/80">
              Agire rapidamente è importante, ma bisogna farlo senza mettere in
              pericolo noi stessi, l&apos;animale o altre persone. Ecco chi
              chiamare, quali informazioni raccogliere e quali errori evitare.
            </p>
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_20px_46px_rgba(0,0,0,0.28)]">
              <Image
                src="/news-animale-abbandonato-hero.png"
                alt="Una persona offre acqua a un cane abbandonato mentre chiama i soccorsi"
                width={1536}
                height={920}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="rounded-[2rem] border border-[#c8ddca] bg-white p-7 shadow-[0_18px_45px_rgba(21,55,36,0.1)] sm:p-12">
            <p className="text-xl font-semibold leading-9 text-[#365f45]">
              La prima regola è osservare prima di intervenire. Un cane senza
              accompagnatore può essere smarrito, un gatto può appartenere a
              una colonia felina o muoversi abitualmente nella zona, mentre un
              animale selvatico potrebbe avere comportamenti difensivi. La
              priorità è valutare il pericolo e attivare il soggetto competente.
            </p>

            <div className="mt-9 rounded-3xl border border-red-200 bg-red-50 p-6">
              <div className="flex gap-4">
                <ShieldAlert className="mt-1 size-7 shrink-0 text-red-700" />
                <div>
                  <h2 className="text-xl font-black text-red-950">
                    Se il maltrattamento è in corso, non affrontare il responsabile
                  </h2>
                  <p className="mt-2 leading-7 text-red-900/80">
                    Allontanati quanto basta per restare al sicuro, chiama il 112
                    e comunica posizione precisa, descrizione dei fatti e presenza
                    di pericoli. Non entrare in proprietà private e non tentare
                    azioni che possano aggravare la situazione.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Numeri utili in Italia
            </h2>
            <p className="mt-4 text-lg leading-8 text-[#365f45]">
              Usa i numeri di emergenza solo quando serve un intervento
              immediato. Per situazioni non urgenti cerca il numero del Servizio
              veterinario della tua ASL, della Polizia Locale o del CRAS
              competente per territorio.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {emergencyContacts.map((contact) => (
                <div
                  key={contact.number}
                  className="rounded-3xl border border-[#c8ddca] bg-[#f4faf5] p-5"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="size-6 text-[#2f7a4d]" />
                    <strong className="text-3xl">{contact.number}</strong>
                  </div>
                  <h3 className="mt-4 font-black">{contact.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#52705d]">
                    {contact.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-[#647769]">
              Il 112 è il Numero Unico Europeo di emergenza nelle aree coperte
              dal NUE e inoltra la richiesta al servizio competente; le
              numerazioni storiche di emergenza restano operative.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 1: animale vagante o presumibilmente abbandonato
            </h2>
            <ol className="mt-7 space-y-5 text-lg leading-8 text-[#365f45]">
              {[
                ["Metti in sicurezza la scena", "Se sei in auto, fermati solo dove è consentito e non creare un secondo pericolo. Mantieni bambini e altri animali a distanza."],
                ["Osserva il comportamento", "Non correre verso l'animale, non fissarlo e non circondarlo. Avvicinati lateralmente solo se appare tranquillo e lascia sempre una via di fuga."],
                ["Cerca elementi identificativi visibili", "Controlla da distanza di sicurezza l'eventuale presenza di medaglietta o collare. Il microchip richiede un apposito lettore."],
                ["Segnala il ritrovamento", "Contatta il Servizio veterinario ASL competente o una Forza di Polizia. Il ritrovamento di un cane senza identificazione visibile deve essere denunciato."],
                ["Resta reperibile", "Comunica posizione, direzione di movimento, specie, colore, taglia e condizioni apparenti; attendi le indicazioni senza inseguire l'animale."],
              ].map(([heading, text], index) => (
                <li key={heading} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2f7a4d] text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <span>
                    <strong className="text-[#153724]">{heading}:</strong>{" "}
                    {text}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-3xl bg-[#edf7ef] p-6">
              <h3 className="text-xl font-black">Se l&apos;animale è sulla strada</h3>
              <p className="mt-3 text-lg leading-8 text-[#365f45]">
                Non invadere la carreggiata e non tentare di bloccare il traffico
                da solo. Chiama subito il 112 o la Polizia Stradale al 113;
                sulle strade urbane puoi contattare anche la Polizia Locale
                attraverso il centralino del Comune. Indica strada, direzione,
                chilometro o punti di riferimento.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 2: animale ferito
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f45]">
              Un animale dolorante può mordere o graffiare anche se normalmente
              docile. Non somministrare farmaci, non offrire cibo e non forzare
              acqua. Evita di spostarlo, salvo che restare fermo comporti un
              pericolo immediato e tu possa farlo senza rischi.
            </p>
            <ul className="mt-6 space-y-4 text-lg leading-8 text-[#365f45]">
              <li className="flex gap-3"><Stethoscope className="mt-1.5 size-5 shrink-0 text-[#2f7a4d]" /><span>Contatta il Servizio veterinario pubblico dell&apos;ASL competente per territorio se l&apos;animale non è di proprietà.</span></li>
              <li className="flex gap-3"><MapPinned className="mt-1.5 size-5 shrink-0 text-[#2f7a4d]" /><span>Descrivi con precisione posizione, condizioni, eventuale incidente e pericoli presenti.</span></li>
              <li className="flex gap-3"><Phone className="mt-1.5 size-5 shrink-0 text-[#2f7a4d]" /><span>Se è bloccato in un punto non raggiungibile in sicurezza, chiama il 115 per il soccorso tecnico.</span></li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-[#365f45]">
              In caso di incidente stradale, chi ha causato il danno a un
              animale ha l&apos;obbligo di fermarsi e attivare un soccorso
              tempestivo. Anche gli altri utenti coinvolti devono adottare ogni
              misura idonea a garantire assistenza.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 3: maltrattamento o detenzione incompatibile
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#365f45]">
              Percosse, ferite, denutrizione evidente, assenza continuativa di
              acqua, esposizione estrema, catene o spazi incompatibili con i
              bisogni dell&apos;animale possono richiedere accertamenti. Non
              spetta al cittadino emettere una sentenza, ma è corretto riferire
              fatti concreti alle autorità.
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-[#c8ddca] bg-[#f4faf5] p-6">
                <Camera className="size-7 text-[#2f7a4d]" />
                <h3 className="mt-4 text-xl font-black">Documenta solo in modo lecito</h3>
                <p className="mt-2 leading-7 text-[#52705d]">
                  Annota data, ora, luogo e fatti osservati. Foto o video possono
                  essere utili se acquisiti da un luogo in cui puoi stare,
                  senza violare proprietà privata né diffondere il materiale
                  sui social.
                </p>
              </div>
              <div className="rounded-3xl border border-[#c8ddca] bg-[#f4faf5] p-6">
                <FileText className="size-7 text-[#2f7a4d]" />
                <h3 className="mt-4 text-xl font-black">Presenta una segnalazione completa</h3>
                <p className="mt-2 leading-7 text-[#52705d]">
                  Indica persone o veicoli riconoscibili, eventuali testimoni,
                  frequenza dei fatti e condizioni dell&apos;animale. Consegna
                  il materiale a Polizia o Carabinieri e conserva una copia.
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-[#365f45]">
              L&apos;abbandono e il maltrattamento sono reati perseguibili
              d&apos;ufficio. Puoi rivolgerti a qualsiasi organo di polizia
              giudiziaria; non è necessario individuare da solo il reparto
              “specializzato”.
            </p>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Capitolo 4: fauna selvatica in difficoltà
            </h2>
            <div className="mt-6 flex gap-4 rounded-3xl border border-[#c8ddca] bg-[#f4faf5] p-6">
              <Trees className="mt-1 size-8 shrink-0 text-[#2f7a4d]" />
              <div>
                <p className="text-lg leading-8 text-[#365f45]">
                  Non catturare, alimentare o trasportare autonomamente un
                  selvatico. Contatta il CRAS, Centro Recupero Animali Selvatici,
                  più vicino oppure la polizia competente per territorio. Per
                  animali di grandi dimensioni, specie potenzialmente pericolose
                  o situazioni stradali, mantieni una distanza ampia e chiama il
                  112.
                </p>
                <p className="mt-4 text-lg leading-8 text-[#365f45]">
                  Un giovane uccello a terra non è sempre abbandonato: i
                  genitori potrebbero trovarsi nelle vicinanze. Prima di
                  raccoglierlo chiedi indicazioni al CRAS.
                </p>
              </div>
            </div>

            <figure className="my-12 overflow-hidden rounded-[1.75rem] border border-[#c8ddca] bg-[#edf7ef]">
              <Image
                src="/news-animale-soccorso-veterinario.png"
                alt="Un veterinario controlla il microchip di un cane trovato"
                width={1536}
                height={920}
                className="h-auto w-full"
              />
              <figcaption className="p-5 text-sm leading-6 text-[#52705d] sm:px-7">
                La lettura del microchip e la presa in carico devono seguire i
                canali previsti sul territorio: ASL veterinaria, autorità e
                strutture autorizzate.
              </figcaption>
            </figure>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Cosa comunicare quando chiediamo aiuto
            </h2>
            <ul className="mt-6 space-y-4 text-lg leading-8 text-[#365f45]">
              {[
                "Posizione esatta, comune, strada, numero civico o coordinate.",
                "Specie, numero di animali, taglia, colore e segni identificativi.",
                "Condizioni visibili e comportamento: immobile, zoppicante, impaurito o aggressivo.",
                "Presenza di traffico, acqua, fuoco, altezza o altri pericoli.",
                "Descrizione oggettiva di un eventuale maltrattamento e se è ancora in corso.",
                "Il tuo recapito e la disponibilità a restare nelle vicinanze in sicurezza.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <PawPrint className="mt-1.5 size-5 shrink-0 text-[#2f7a4d]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-3xl font-black tracking-tight">
              Errori da evitare
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ["Inseguire o accerchiare", "Può spingere l'animale verso il traffico o provocare una reazione difensiva."],
                ["Improvvisare cure", "Farmaci umani, cibo o manipolazioni possono peggiorare le condizioni."],
                ["Portarlo via senza segnalare", "Potrebbe essere smarrito, avere un proprietario e dover essere identificato tramite microchip."],
                ["Pubblicare accuse online", "Invia prove e informazioni alle autorità; evita esposizioni pubbliche che possono ostacolare gli accertamenti."],
              ].map(([heading, text]) => (
                <div key={heading} className="rounded-3xl border border-[#c8ddca] bg-[#f4faf5] p-5">
                  <h3 className="font-black">{heading}</h3>
                  <p className="mt-2 leading-7 text-[#52705d]">{text}</p>
                </div>
              ))}
            </div>

            <section className="mt-12 rounded-[2rem] bg-[linear-gradient(135deg,#071f18,#286342)] p-7 text-white sm:p-10">
              <MapPinned className="size-9 text-[#b8edca]" />
              <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#b8edca]">
                Segnalazione locale in tempo reale
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Dopo aver chiamato chi può intervenire, segnalalo anche su Commety
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Nell&apos;attesa puoi indicare in un click sulla mappa la presenza
                di un animale vagante o in difficoltà. La segnalazione aiuta le
                persone vicine a prestare attenzione, evitare pericoli e fornire
                eventuali conferme sulla posizione.
              </p>
              <p className="mt-5 text-lg leading-8 text-white/80">
                Commety non sostituisce il 112, il 115, il Servizio veterinario
                ASL, il CRAS o una denuncia alle Forze dell&apos;ordine. Usalo
                soltanto dopo aver attivato i canali competenti e senza
                pubblicare volti, targhe, indirizzi privati o accuse personali.
              </p>
              <Link
                href="/mappa"
                className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3.5 font-black text-white transition hover:bg-emerald-400"
              >
                <PawPrint className="size-5" />
                Segnala su Commety
                <ArrowRight className="size-5" />
              </Link>
            </section>

            <section aria-labelledby="faq-title" className="mt-14 border-t border-[#dce9dc] pt-12">
              <div className="flex items-center gap-3">
                <CircleAlert className="size-7 text-[#2f7a4d]" />
                <h2 id="faq-title" className="text-3xl font-black tracking-tight">
                  Domande frequenti
                </h2>
              </div>
              <div className="mt-7 space-y-7">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="text-xl font-black">{faq.question}</h3>
                    <p className="mt-2 text-lg leading-8 text-[#365f45]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-10 rounded-3xl border border-[#dce9dc] bg-[#f7faf6] p-5 text-sm leading-6 text-[#647769]">
              Guida informativa riferita all&apos;Italia. Organizzazione e
              recapiti dei servizi veterinari, della Polizia Locale e dei CRAS
              variano per territorio: verifica sempre i contatti ufficiali di
              Regione, ASL e Comune.
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
