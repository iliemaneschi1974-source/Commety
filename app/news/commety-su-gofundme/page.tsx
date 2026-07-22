import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Accessibility, ArrowLeft, ArrowUpRight, HeartHandshake, MapPinned, Network, ShieldCheck, UsersRound } from "lucide-react";

const gofundmeUrl = "https://www.gofundme.com/f/dona-per-commety-una-piattaforma-italiana-per-il-sociale";
const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.commety.it";
const articleUrl = `${siteUrl}/news/commety-su-gofundme`;
const publishedAt = "2026-07-22T09:00:00+02:00";

export const metadata: Metadata = {
  title: "Commety è su GoFundMe: sostieni una piattaforma italiana per il sociale",
  description: "Commety apre una raccolta GoFundMe per far crescere una piattaforma italiana dedicata a territorio, inclusione, informazione utile e community.",
  keywords: [
    "Commety GoFundMe",
    "piattaforma italiana sociale",
    "crowdfunding innovazione italiana",
    "mappa partecipata",
    "segnalazioni territorio",
    "community locale",
    "accessibilità e disabilità",
    "innovazione sociale italiana",
  ],
  authors: [{ name: "Commety", url: siteUrl }],
  creator: "Commety",
  publisher: "Commety",
  category: "Innovazione sociale",
  alternates: { canonical: "/news/commety-su-gofundme" },
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
    title: "Commety è su GoFundMe: costruiamo insieme la mappa del mondo reale",
    description: "Sostieni Commety: una piattaforma italiana per il territorio, l'inclusione e una community più connessa.",
    siteName: "Commety",
    locale: "it_IT",
    publishedTime: publishedAt,
    modifiedTime: publishedAt,
    section: "News",
    tags: ["GoFundMe", "crowdfunding", "innovazione sociale", "community", "territorio"],
    images: [{
      url: `${siteUrl}/og-institutional-map.png`,
      width: 1731,
      height: 909,
      alt: "Commety, la mappa del mondo reale",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commety è su GoFundMe",
    description: "Sostieni una piattaforma italiana per il territorio, l'inclusione e la community.",
    images: [`${siteUrl}/og-institutional-map.png`],
  },
};

export default function GoFundMeNewsPage() {
  return (
    <main className="min-h-screen bg-[#f5f9ff] text-[#0b2450]">
      <header className="border-b border-[#dbe8f8] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-5 sm:px-8">
          <Link href="/" aria-label="Commety"><Image src="/logo-header-cropped.png" alt="Commety" width={150} height={40} className="h-9 w-auto object-contain" style={{ width: "auto" }} /></Link>
          <Link href="/news" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-[#234d89] transition hover:bg-[#eaf2ff]"><ArrowLeft className="size-4" /> Tutte le news</Link>
        </div>
      </header>

      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: "Da oggi Commety è anche su GoFundMe",
              description: "Commety apre una raccolta GoFundMe per far crescere una piattaforma italiana dedicata a territorio, inclusione, informazione utile e community.",
              image: [`${siteUrl}/og-institutional-map.png`],
              datePublished: publishedAt,
              dateModified: publishedAt,
              mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
              inLanguage: "it-IT",
              articleSection: "News",
              keywords: "GoFundMe, crowdfunding, innovazione sociale, community, territorio, accessibilità",
              author: { "@type": "Organization", name: "Commety", url: siteUrl },
              publisher: {
                "@type": "Organization",
                name: "Commety",
                url: siteUrl,
                logo: { "@type": "ImageObject", url: `${siteUrl}/logo-commety.png` },
              },
            }),
          }}
        />
        <section className="bg-[radial-gradient(circle_at_84%_8%,#2a67ae_0%,#0F2D5F_34%,#061735_100%)] px-6 py-16 text-white sm:px-8 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#a9d5ff]">Commety News · 22 luglio 2026</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">Da oggi Commety &egrave; anche su GoFundMe</h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-white/80">Una raccolta per far crescere una piattaforma italiana, utile e costruita insieme alle persone.</p>
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-[0_20px_46px_rgba(0,0,0,0.28)]">
              <Image src="/og-institutional-map.png" alt="La mappa Commety con i marker della community" width={1731} height={909} priority className="h-auto w-full" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="rounded-[2rem] border border-[#b9d3f3] bg-white p-7 shadow-[0_18px_45px_rgba(10,43,89,0.12)] sm:p-12">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><HeartHandshake className="size-6" /></div>
            <p className="mt-8 text-lg leading-8 text-[#29496f]">Commety &egrave; nata da una convinzione semplice: ci&ograve; che accade intorno a noi merita di essere raccontato in modo utile, immediato e rispettoso. Non solo problemi, ma anche eventi, iniziative, mobilit&agrave;, animali, meteo, mare e vita quotidiana.</p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">Oggi abbiamo aperto una raccolta su GoFundMe per sostenere il prossimo passo del progetto: rendere Commety pi&ugrave; solida, sicura e capace di arrivare in sempre pi&ugrave; territori italiani.</p>

            <h2 className="mt-11 text-3xl font-black tracking-tight text-[#0b2450]">Non un&apos;altra app: una mappa della vita reale</h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">Quando apriamo una mappa, spesso cerchiamo soltanto una strada. Ma il territorio &egrave; molto di pi&ugrave;: un concerto che sta per iniziare, un tratto difficile da percorrere, un luogo accogliente per un cane, un servizio che funziona bene, un problema che ha bisogno di attenzione.</p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">Commety vuole dare contesto a queste informazioni e restituirle alla comunit&agrave;. Una segnalazione non &egrave; un contenuto da consumare e dimenticare: pu&ograve; aiutare qualcuno a decidere, partecipare, evitare un disagio o semplicemente sentirsi pi&ugrave; vicino al luogo in cui vive.</p>

            <h2 className="mt-11 text-3xl font-black tracking-tight text-[#0b2450]">Un&apos;idea italiana, costruita qui</h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">Troppo spesso pensiamo che le idee innovative arrivino soltanto da altri Paesi. Commety vuole dimostrare il contrario: anche in Italia sappiamo immaginare, progettare e sviluppare prodotti digitali moderni, concreti e capaci di creare legami tra le persone.</p>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">La piattaforma &egrave; gi&agrave; funzionante da computer e da smartphone. La community pu&ograve; esplorare una mappa interattiva, inviare segnalazioni con testo, foto o video, costruire un profilo, maturare reputazione e dialogare in privato con altri utenti registrati.</p>

            <figure className="my-11 overflow-hidden rounded-[1.75rem] border border-[#cfe1f6] bg-[#eaf3ff]">
              <div className="grid items-center sm:grid-cols-[0.85fr_1.15fr]">
                <Image src="/landing-maria-rossi.png" alt="Esempio di profilo della community Commety" width={1254} height={1254} className="h-full w-full object-cover" />
                <figcaption className="p-7 text-base leading-7 text-[#36577f] sm:p-9"><strong className="block text-xl text-[#0b2450]">Una community non &egrave; fatta di numeri.</strong> &Egrave; fatta di persone, esperienze e contributi diversi. Il profilo, la reputazione e i messaggi privati esistono per favorire relazioni responsabili, non per trasformare le persone in dati.</figcaption>
              </div>
            </figure>

            <h2 className="mt-11 text-3xl font-black tracking-tight text-[#0b2450]">La parte etica e sociale di Commety</h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">La tecnologia &egrave; utile soltanto quando migliora concretamente la vita delle persone. Per questo Commety non vuole inseguire polemiche, paura o attenzione a ogni costo. Vuole favorire informazioni verificabili, una conversazione civile e contributi che abbiano un impatto positivo sul territorio.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5"><ShieldCheck className="size-7 text-[#1b62ad]" /><h3 className="mt-4 text-lg font-black">Rispetto e sicurezza</h3><p className="mt-2 text-sm leading-6 text-[#47658a]">Moderazione dei contenuti, attenzione alla privacy e rifiuto di insulti, odio e diffusione di dati personali.</p></div>
              <div className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5"><Accessibility className="size-7 text-[#1b62ad]" /><h3 className="mt-4 text-lg font-black">Inclusione reale</h3><p className="mt-2 text-sm leading-6 text-[#47658a]">Informazioni utili anche per chi incontra barriere, ha esigenze specifiche o cerca servizi davvero accessibili.</p></div>
              <div className="rounded-3xl border border-[#cfe1f6] bg-[#f6faff] p-5"><UsersRound className="size-7 text-[#1b62ad]" /><h3 className="mt-4 text-lg font-black">Responsabilit&agrave; condivisa</h3><p className="mt-2 text-sm leading-6 text-[#47658a]">Ogni contributo pu&ograve; rendere la mappa pi&ugrave; utile, purch&eacute; sia onesto, recente e rispettoso degli altri.</p></div>
            </div>
            <p className="mt-7 text-lg leading-8 text-[#29496f]">Commety non sostituisce le autorit&agrave;, i servizi di emergenza o le fonti ufficiali. Vuole essere uno strumento in pi&ugrave;: un luogo digitale dove la cura del territorio passa anche da un gesto semplice, come condividere un&apos;informazione nel modo giusto.</p>

            <h2 className="mt-11 text-3xl font-black tracking-tight text-[#0b2450]">Cosa vogliamo costruire insieme</h2>
            <p className="mt-5 text-lg leading-8 text-[#29496f]">La raccolta aiuter&agrave; a sostenere infrastruttura tecnica, moderazione, sicurezza, accessibilit&agrave; e le prossime funzionalit&agrave;. Tra le idee che vogliamo sviluppare ci sono nuove categorie dedicate alla vita reale del territorio:</p>
            <ul className="mt-6 space-y-4 text-lg leading-8 text-[#29496f]">
              <li className="flex gap-3"><Accessibility className="mt-1 size-6 shrink-0 text-[#1b62ad]" /><span><strong className="text-[#0b2450]">Disabilit&agrave;:</strong> per segnalare luoghi accessibili, servizi fruibili e ostacoli che rendono pi&ugrave; difficile muoversi.</span></li>
              <li className="flex gap-3"><Network className="mt-1 size-6 shrink-0 text-[#1b62ad]" /><span><strong className="text-[#0b2450]">Rete:</strong> per condividere miglioramenti di copertura, guasti e disservizi di telefonia e connessione internet nel territorio.</span></li>
            </ul>
            <p className="mt-6 text-lg leading-8 text-[#29496f]">L&apos;obiettivo non &egrave; accumulare funzioni, ma ascoltare bisogni reali e trasformarli in strumenti semplici da usare. Ogni evoluzione dovr&agrave; mantenere lo stesso principio: essere utile alle persone prima di tutto.</p>

            <div className="mt-12 rounded-3xl bg-[linear-gradient(135deg,#071a3c,#1b4b87)] p-7 text-white sm:p-9">
              <MapPinned className="size-8 text-[#a9d5ff]" />
              <h2 className="mt-5 text-2xl font-black">Prova Commety e sostieni il progetto</h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/80">Prima ancora di scegliere se sostenerci, prova Commety: &egrave; gi&agrave; online, interamente utilizzabile e pronta a crescere con le idee della sua community.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={gofundmeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-white transition hover:bg-emerald-400">Sostieni Commety su GoFundMe <ArrowUpRight className="size-5" /></a>
                <Link href="/mappa" className="inline-flex items-center gap-2 rounded-2xl border border-white/25 px-5 py-3 font-black text-white transition hover:bg-white/10">Apri la mappa</Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
