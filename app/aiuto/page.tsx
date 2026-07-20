import type { Metadata } from "next";

import LegalPageLayout from "@/components/Legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Aiuto e guida a Commety",
  description:
    "Scopri come usare Commety: segnalazioni, foto, video, conferme, reputazione, XP, profili e messaggi privati.",
  alternates: { canonical: "/aiuto" },
  robots: {
    index: true,
    follow: true,
  },
};

const chapters = [
  ["segnalare", "Creare una segnalazione"],
  ["categorie", "Categorie e durata"],
  ["media", "Foto e video"],
  ["conferme", "Conferme e affidabilità"],
  ["profilo", "Account, profilo e XP"],
  ["chat", "Chat e sicurezza"],
  ["regole", "Regole della community"],
] as const;

export default function HelpPage() {
  return (
    <LegalPageLayout
      eyebrow="Guida alla community"
      title="Come usare Commety"
      updatedAt="20 luglio 2026"
    >
      <p className="commety-legal-lead">
        Commety è la mappa partecipata di ciò che accade davvero intorno a te:
        informazioni utili, momenti da vivere e aggiornamenti condivisi dalla
        community.
      </p>

      <nav
        aria-label="Indice della guida"
        className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-5"
      >
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#a9d5ff]">
          In questa guida
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {chapters.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-bold text-white no-underline transition hover:bg-white/20"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <section id="segnalare">
        <h2>1. Come creo una segnalazione?</h2>
        <p>
          Apri la mappa e usa il pulsante <strong>Segnala</strong>. Scegli la
          categoria, inserisci un titolo chiaro e aggiungi una breve
          descrizione. La posizione della segnalazione è quella che scegli
          sulla mappa: verifica sempre che sia corretta prima di pubblicare.
        </p>
        <ul>
          <li>Puoi segnalare anche senza creare un account.</li>
          <li>
            Le segnalazioni vengono controllate prima di diventare visibili
            sulla mappa.
          </li>
          <li>
            Se un contenuto non supera i controlli, il modulo resta aperto:
            puoi correggere il testo o il materiale e riprovare.
          </li>
          <li>
            Scrivi fatti osservabili e utili: dove, cosa sta accadendo e, se
            serve, da quando.
          </li>
        </ul>
        <p>
          Un Evento non deve essere per forza un problema: può raccontare un
          concerto, una partita, un aperitivo, un ricordo, un&apos;iniziativa
          locale o anche una criticità.
        </p>
      </section>

      <section id="categorie">
        <h2>2. Tipi di segnalazione e durata</h2>
        <p>
          Ogni categoria ha un tempo di visibilità pensato per quanto
          l&apos;informazione resta utile. Le segnalazioni scadute spariscono dalla
          mappa e dalle sezioni recenti del profilo; i totali storici del
          profilo, invece, non diminuiscono.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/15">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-white/10 text-white">
              <tr>
                <th className="px-4 py-3 font-black">Categoria</th>
                <th className="px-4 py-3 font-black">Visibilità iniziale</th>
                <th className="px-4 py-3 font-black">Massimo possibile</th>
                <th className="px-4 py-3 font-black">Esempi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/80">
              <tr><td className="px-4 py-3 font-bold text-sky-200">Meteo</td><td className="px-4 py-3">2 ore</td><td className="px-4 py-3">6 ore</td><td className="px-4 py-3">Pioggia, vento, grandine</td></tr>
              <tr><td className="px-4 py-3 font-bold text-amber-200">Traffico</td><td className="px-4 py-3">2 ore</td><td className="px-4 py-3">6 ore</td><td className="px-4 py-3">Code, lavori, rallentamenti</td></tr>
              <tr><td className="px-4 py-3 font-bold text-red-300">Pericolo</td><td className="px-4 py-3">12 ore</td><td className="px-4 py-3">48 ore</td><td className="px-4 py-3">Ostacoli, strade non sicure</td></tr>
              <tr><td className="px-4 py-3 font-bold text-cyan-200">Mare</td><td className="px-4 py-3">12 ore</td><td className="px-4 py-3">48 ore</td><td className="px-4 py-3">Mare mosso, condizioni della spiaggia</td></tr>
              <tr><td className="px-4 py-3 font-bold text-violet-200">Eventi</td><td className="px-4 py-3">24 ore</td><td className="px-4 py-3">72 ore</td><td className="px-4 py-3">Musica, sport, iniziative e momenti locali</td></tr>
              <tr><td className="px-4 py-3 font-bold text-orange-200">Animali</td><td className="px-4 py-3">24 ore</td><td className="px-4 py-3">72 ore</td><td className="px-4 py-3">Animali in difficoltà e luoghi pet-friendly</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Un&apos;attività utile della community vicino alla scadenza può prolungare
          la visibilità, senza superare il limite massimo della categoria.
        </p>
      </section>

      <section id="media">
        <h2>3. Foto e video: cosa posso pubblicare?</h2>
        <p>
          Per ogni segnalazione puoi scegliere <strong>una foto</strong> oppure
          <strong> un video</strong>. La foto può essere scattata o scelta dalla
          galleria; il video si registra solo dalla fotocamera e dura al
          massimo 5 secondi. Prima della pubblicazione puoi rivederne
          l&apos;anteprima.
        </p>
        <ul>
          <li>Foto e video passano un controllo di sicurezza e coerenza con la segnalazione.</li>
          <li>
            Prima della pubblicazione Commety prova a sfocare automaticamente
            visi, targhe e testo leggibile; viene mostrata soltanto la copia
            protetta, non il file originale.
          </li>
          <li>Il video viene controllato in più momenti, non soltanto nel primo fotogramma.</li>
          <li>Nei video pubblicati compare il watermark Commety.</li>
          <li>
            Non pubblicare volti riconoscibili, minori, dati personali,
            documenti, contenuti intimi o immagini che possano danneggiare
            altre persone.
          </li>
          <li>
            Per targhe, situazioni di emergenza e possibili reati, privilegia
            sempre la sicurezza e contatta le autorità competenti quando serve.
          </li>
        </ul>
      </section>

      <section id="conferme">
        <h2>4. Cosa sono le conferme?</h2>
        <p>
          Se vedi che una segnalazione è corretta e ancora attuale, puoi usare
          <strong> Conferma</strong> nella sua scheda. È un modo semplice per
          rendere la mappa più affidabile. Non puoi confermare una segnalazione
          creata da te, nemmeno se l&apos;hai pubblicata in forma anonima.
        </p>
        <p>
          Le conferme ricevute sono visibili nelle statistiche dell&apos;autore.
          Quelle degli utenti registrati contribuiscono anche al suo punteggio
          di affidabilità. Se ritiri una conferma, il punteggio viene aggiornato
          di conseguenza.
        </p>
      </section>

      <section id="profilo">
        <h2>5. Perché registrarsi? Profilo, reputazione e XP</h2>
        <p>
          L&apos;account non è necessario per esplorare la mappa o inviare una
          segnalazione, ma permette di costruire un profilo, avere statistiche,
          guadagnare XP, ricevere affidabilità e usare i messaggi privati.
          Al primo accesso puoi indicare perché sei entrato in Commety e almeno
          una categoria che ti interessa; puoi modificare queste preferenze in
          seguito dalla matita accanto al nome.
        </p>
        <h3 className="mt-6 text-lg font-black text-white">Come guadagno XP?</h3>
        <ul>
          <li>10 XP per una segnalazione pubblicata.</li>
          <li>3 XP per una foto pubblicata con la segnalazione.</li>
          <li>5 XP per un video pubblicato con la segnalazione.</li>
          <li>2 XP per un commento pubblicato.</li>
        </ul>
        <p>
          Gli XP sono cumulativi. La barra del profilo mostra invece il
          progresso all&apos;interno del livello attuale, perciò non confronta gli
          XP totali con la soglia del livello successivo.
        </p>
        <h3 className="mt-6 text-lg font-black text-white">Come divento utente verificato?</h3>
        <p>
          La verifica è meritata dalla qualità riconosciuta dalla community,
          non si acquista e non richiede una domanda manuale. Il punteggio di
          affidabilità parte da Nuovo membro, passa ad Affidabile da 15 punti,
          a Reporter verificato da 40 punti e a Sentinella locale da 70 punti.
          Reporter verificato e Sentinella locale mostrano il badge di utente
          verificato nel profilo.
        </p>
      </section>

      <section id="chat">
        <h2>6. Come funzionano chat e messaggi?</h2>
        <p>
          La chat è riservata agli utenti registrati. Puoi aprire il profilo di
          un altro membro dalla segnalazione o dalla community e scegliere
          <strong> Ti piacerebbe parlare con me?</strong>. L&apos;altra persona può
          accettare o rifiutare: solo dopo l&apos;accettazione entrambi possono
          scrivere il primo messaggio.
        </p>
        <ul>
          <li>Le richieste in arrivo sono visibili nella sezione Messaggi e nel relativo indicatore.</li>
          <li>Puoi terminare una chat: la conversazione viene eliminata.</li>
          <li>Se un utente si comporta male, puoi segnalarlo e bloccarlo dalla chat.</li>
          <li>I messaggi non sono pubblici, non appaiono sulla mappa e non sono indicizzati dai motori di ricerca.</li>
        </ul>
        <p>
          Anche i messaggi e i commenti sono sottoposti a moderazione testuale:
          linguaggio offensivo, insulti, bestemmie, molestie, spam e contenuti
          non adatti vengono bloccati. Non cercare scorciatoie cambiando una
          lettera o usando il plurale: il controllo considera le varianti più
          comuni delle parole vietate.
        </p>
      </section>

      <section id="regole">
        <h2>7. Regole semplici per una mappa utile</h2>
        <ul>
          <li>Condividi solo informazioni reali, recenti e collocate nel punto giusto.</li>
          <li>Evita duplicati, segnalazioni ripetute e pubblicazioni in massa: Commety limita i comportamenti spam.</li>
          <li>Non insultare, non discriminare e non diffondere dati personali di altre persone.</li>
          <li>Per maltrattamenti di animali, pericoli immediati o emergenze, contatta prima i servizi competenti.</li>
          <li>Se qualcosa non va, non pubblicarlo di nuovo: correggilo oppure scrivi a <a href="mailto:privacy@commety.it">privacy@commety.it</a>.</li>
        </ul>
        <p>
          Commety funziona quando ogni contributo aiuta qualcuno a capire cosa
          sta succedendo davvero, con rispetto per le persone e per il
          territorio.
        </p>
      </section>
    </LegalPageLayout>
  );
}
