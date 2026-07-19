import type { Metadata } from "next";

import LegalPageLayout from "@/components/Legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Termini di utilizzo",
  description: "Termini di utilizzo della piattaforma Commety.",
  alternates: { canonical: "/termini" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Regole della community"
      title="Termini di utilizzo"
      updatedAt="19 luglio 2026"
    >
      <p className="commety-legal-lead">
        Commety è una piattaforma partecipata che permette di condividere e
        consultare informazioni sul territorio. Usando il servizio accetti i
        presenti Termini di utilizzo.
      </p>

      <section>
        <h2>1. Il servizio</h2>
        <p>
          Commety rende disponibili una mappa, segnalazioni, commenti,
          conferme e funzionalità di community. Le informazioni pubblicate
          provengono dagli utenti e possono essere soggette a moderazione,
          aggiornamento, scadenza o rimozione.
        </p>
      </section>

      <section>
        <h2>2. Account e responsabilità</h2>
        <p>
          Alcune funzionalità richiedono l&apos;accesso con un account Google. Sei
          responsabile della correttezza dei dati forniti, della sicurezza del
          tuo accesso e delle attività svolte tramite il tuo account. Se sei
          minorenne, usa il servizio con l&apos;autorizzazione di chi esercita la
          responsabilità genitoriale.
        </p>
      </section>

      <section>
        <h2>3. Regole per contenuti e segnalazioni</h2>
        <p>Quando pubblichi una segnalazione, una foto o un commento, ti impegni a:</p>
        <ul>
          <li>condividere informazioni vere, pertinenti e aggiornate;</li>
          <li>non pubblicare insulti, minacce, discriminazioni, spam o contenuti illeciti;</li>
          <li>non caricare immagini o testi che violino privacy, diritti d&apos;autore o altri diritti di terzi;</li>
          <li>non indicare dati personali, targhe, volti identificabili o informazioni riservate senza autorizzazione;</li>
          <li>non usare Commety per emergenze: in caso di pericolo immediato contatta i servizi di emergenza competenti;</li>
          <li>non tentare di alterare il funzionamento della piattaforma, aggirare la moderazione o creare attività artificiali.</li>
        </ul>
      </section>

      <section>
        <h2>4. Visibilità e licenza dei contenuti</h2>
        <p>
          Mantieni i diritti sui contenuti che pubblichi. Con la pubblicazione
          concedi a Commety una licenza non esclusiva, gratuita e limitata alla
          durata necessaria per ospitare, mostrare, adattare tecnicamente,
          moderare e distribuire il contenuto all&apos;interno del servizio e nelle
          sue condivisioni funzionali. Le segnalazioni e i commenti possono
          essere visibili pubblicamente insieme al nome utente scelto.
        </p>
      </section>

      <section>
        <h2>5. Moderazione</h2>
        <p>
          Commety può verificare, limitare, nascondere o rimuovere contenuti e
          account che violano questi Termini, la legge o la sicurezza della
          community. La moderazione può avvalersi di controlli automatici e di
          valutazioni successive. In caso di errore puoi scrivere a{" "}
          <a href="mailto:privacy@commety.it">privacy@commety.it</a>.
        </p>
      </section>

      <section>
        <h2>6. Affidabilità delle informazioni</h2>
        <p>
          Commety non garantisce che ogni segnalazione sia completa, esatta o
          aggiornata. La piattaforma non sostituisce fonti ufficiali, autorità,
          servizi sanitari, bollettini meteo, forze dell&apos;ordine o servizi di
          emergenza. Ogni utente valuta autonomamente come utilizzare le
          informazioni disponibili.
        </p>
      </section>

      <section>
        <h2>7. Disponibilità e modifiche</h2>
        <p>
          Possiamo aggiornare, sospendere o modificare funzionalità del servizio
          per ragioni tecniche, di sicurezza, normative o organizzative. Faremo
          quanto ragionevolmente possibile per mantenere il servizio disponibile,
          senza garantire continuità assoluta o assenza di errori.
        </p>
      </section>

      <section>
        <h2>8. Proprietà intellettuale</h2>
        <p>
          Marchio Commety, grafica, software e contenuti proprietari della
          piattaforma sono protetti dalle norme applicabili. Non è consentito
          copiarli, modificarli o sfruttarli al di fuori di quanto necessario
          per il normale utilizzo del servizio senza autorizzazione.
        </p>
      </section>

      <section>
        <h2>9. Legge applicabile e contatti</h2>
        <p>
          I presenti Termini sono regolati dalla legge italiana, fatti salvi i
          diritti inderogabili riconosciuti ai consumatori. Per domande o
          segnalazioni puoi contattare Ilie Maneschi all&apos;indirizzo{" "}
          <a href="mailto:privacy@commety.it">privacy@commety.it</a>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
