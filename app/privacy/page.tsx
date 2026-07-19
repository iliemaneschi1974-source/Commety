import type { Metadata } from "next";

import LegalPageLayout from "@/components/Legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali di Commety.",
  alternates: { canonical: "/privacy" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Trasparenza e protezione dei dati"
      title="Privacy Policy"
      updatedAt="19 luglio 2026"
    >
      <p className="commety-legal-lead">
        Questa informativa spiega come Commety tratta i dati personali di chi
        visita la piattaforma, crea un account o partecipa alla community.
      </p>

      <section>
        <h2>1. Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento è <strong>Ilie Maneschi</strong>, con
          sede in via Gradoli 89, 00189 Roma, codice fiscale MNSLII74R05H501N.
          Per informazioni o richieste relative alla privacy puoi scrivere a{" "}
          <a href="mailto:privacy@commety.it">privacy@commety.it</a>.
        </p>
      </section>

      <section>
        <h2>2. Dati trattati</h2>
        <p>In base a come utilizzi Commety, possiamo trattare:</p>
        <ul>
          <li>
            dati dell&apos;account Google usati per l&apos;accesso, quali identificativo,
            nome visualizzato, indirizzo email e immagine profilo;
          </li>
          <li>
            dati del profilo Commety, come nome utente, livello, punteggio e
            preferenze;
          </li>
          <li>
            contenuti che scegli di pubblicare: segnalazioni, commenti, foto,
            categoria, data e posizione geografica della segnalazione;
          </li>
          <li>
            identificativi tecnici del dispositivo e dati di utilizzo necessari
            a prevenire abusi, duplicazioni e frodi;
          </li>
          <li>
            dati tecnici di navigazione e misurazioni aggregate tramite Google
            Analytics, solo dopo il consenso quando richiesto.
          </li>
        </ul>
        <p>
          Le segnalazioni, i commenti, il nome utente e le immagini associati a
          contenuti pubblicati possono essere visibili pubblicamente agli altri
          visitatori. Non pubblicare dati personali di terzi, immagini di minori
          o informazioni riservate senza una valida base giuridica.
        </p>
      </section>

      <section>
        <h2>3. Finalità e basi giuridiche</h2>
        <ul>
          <li>
            erogare la piattaforma, gestire l&apos;account e consentire la
            pubblicazione dei contenuti: esecuzione del servizio richiesto
            dall&apos;utente;
          </li>
          <li>
            moderare segnalazioni, immagini e commenti, tutelare la sicurezza
            della community e prevenire abusi: legittimo interesse del titolare
            e degli utenti;
          </li>
          <li>
            adempiere a obblighi di legge, richieste delle autorità e difesa di
            diritti: obbligo legale o legittimo interesse;
          </li>
          <li>
            misurare in forma aggregata l&apos;uso del sito con Google Analytics:
            consenso, quando previsto dalla normativa sui cookie e strumenti di
            tracciamento.
          </li>
        </ul>
        <p>
          Commety non utilizza Google Analytics per pubblicità personalizzata,
          remarketing o profilazione commerciale.
        </p>
      </section>

      <section>
        <h2>4. Moderazione e decisioni automatizzate</h2>
        <p>
          Per mantenere la community sicura, alcuni contenuti possono essere
          sottoposti a controlli automatici contro linguaggio offensivo, spam e
          contenuti non conformi. Questi controlli supportano la moderazione e
          non producono decisioni automatizzate con effetti giuridici o
          analogamente significativi sulla persona. Puoi chiedere chiarimenti o
          contestare una decisione scrivendo a privacy@commety.it.
        </p>
      </section>

      <section>
        <h2>5. Fornitori e destinatari</h2>
        <p>
          Per erogare il servizio utilizziamo fornitori che trattano dati per
          nostro conto o secondo le proprie condizioni: Google Firebase
          (autenticazione, database, archiviazione delle immagini e funzioni
          tecniche), Vercel (hosting e infrastruttura) e Google Analytics
          (misurazione del traffico). I dati possono essere trattati anche da
          fornitori situati fuori dallo Spazio Economico Europeo; in tali casi
          vengono adottate le garanzie previste dalla normativa applicabile,
          come clausole contrattuali standard o altri strumenti idonei.
        </p>
        <p>
          I dati possono inoltre essere comunicati a soggetti autorizzati, a
          consulenti e alle autorità competenti quando ciò sia imposto dalla
          legge o necessario per tutelare diritti e sicurezza.
        </p>
      </section>

      <section>
        <h2>6. Conservazione</h2>
        <p>
          Conserviamo i dati dell&apos;account per il tempo in cui l&apos;account rimane
          attivo e per il periodo necessario a gestire richieste, sicurezza e
          obblighi di legge. Le segnalazioni, i commenti e le relative immagini
          restano disponibili fino alla loro scadenza, rimozione, anonimizzazione
          o fino a quando siano necessari per le finalità sopra indicate. I dati
          tecnici e di sicurezza sono conservati per il tempo strettamente
          necessario; i dati Analytics seguono le impostazioni di conservazione
          configurate nel relativo servizio e le preferenze di consenso.
        </p>
      </section>

      <section>
        <h2>7. Cookie e Google Analytics</h2>
        <p>
          Commety utilizza cookie e strumenti tecnici necessari al funzionamento
          della piattaforma. Google Analytics, quando attivo, è usato per
          statistiche aggregate e non per pubblicità o remarketing. Gli
          strumenti non tecnici vengono attivati solo dopo il consenso, ove
          richiesto. Puoi modificare la scelta tramite le impostazioni cookie
          disponibili sul sito quando il relativo strumento è attivo.
        </p>
      </section>

      <section>
        <h2>8. I tuoi diritti</h2>
        <p>
          Nei limiti previsti dal GDPR puoi chiedere accesso, rettifica,
          cancellazione, limitazione, opposizione, portabilità e revoca del
          consenso. Per esercitare i diritti scrivi a{" "}
          <a href="mailto:privacy@commety.it">privacy@commety.it</a>. Hai anche
          il diritto di proporre reclamo al Garante per la protezione dei dati
          personali.
        </p>
      </section>

      <section>
        <h2>9. Aggiornamenti</h2>
        <p>
          Potremmo aggiornare questa informativa per riflettere modifiche del
          servizio o della normativa. La versione aggiornata sarà pubblicata su
          questa pagina con la relativa data di aggiornamento.
        </p>
      </section>
    </LegalPageLayout>
  );
}
