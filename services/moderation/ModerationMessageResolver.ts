import { ModerationEvidence } from "@/core/engines/moderation/ModerationEvidence";

import { ModerationMessage } from "./ModerationMessage";

/**
 * ============================================================================
 * APPLICATION LAYER
 * ----------------------------------------------------------------------------
 * ModerationMessageResolver
 *
 * Traduce le evidenze prodotte dal Moderation Engine
 * in messaggi comprensibili dall'utente.
 *
 * Questa classe NON contiene logica di business.
 * ============================================================================
 */
export class ModerationMessageResolver {

  /**
   * Messaggio unico mostrato
   * per qualsiasi violazione
   * relativa alle immagini.
   */
  private static readonly IMAGE_MODERATION_MESSAGE =
    new ModerationMessage(
      "Attenzione!",
      "L'immagine non è coerente con il titolo e la descrizione della tua segnalazione o viola le regole di Commetty."
    );

  /**
   * Tutte le evidenze riconducibili
   * alla moderazione delle immagini.
   *
   * Indipendentemente dalla regola che
   * ha prodotto il blocco, l'utente
   * riceverà sempre lo stesso messaggio.
   */
  private static readonly IMAGE_EVIDENCES =
    new Set<ModerationEvidence["tipo"]>([
      "IMMAGINE_PORNOGRAFICA",
      "IMMAGINE_CON_NUDITA",
      "IMMAGINE_VIOLENTA",
      "IMMAGINE_CRUENTA",
      "ARMI_RILEVATE",
      "MINORI_RILEVATI",
      "MALTRATTAMENTO_ANIMALI",

      "WATERMARK",
      "SCREENSHOT",
      "MEME",
      "IMMAGINE_AI",
      "IMMAGINE_DUPLICATA",

      "VOLTO_RILEVATO",
      "TARGA_RILEVATA",
      "DATI_PERSONALI_RILEVATI",

      "CONTENUTO_NON_PERTINENTE",
      "IMMAGINE_NON_COERENTE",
    ]);

  /**
   * Catalogo dei messaggi di moderazione.
   */
  private static readonly MESSAGES = new Map<
    ModerationEvidence["tipo"],
    ModerationMessage
  >([
    // -----------------------------------------------------------------------
    // Spam
    // -----------------------------------------------------------------------

    [
      "SPAM",
      new ModerationMessage(
        "Contenuto spam",
        "La segnalazione è stata identificata come spam."
      ),
    ],

    [
      "CARATTERI_RIPETUTI",
      new ModerationMessage(
        "Testo non valido",
        "La segnalazione contiene un numero eccessivo di caratteri ripetuti."
      ),
    ],

    [
      "PAROLE_RIPETUTE",
      new ModerationMessage(
        "Testo non valido",
        "La segnalazione contiene parole ripetute in modo anomalo."
      ),
    ],

    [
      "EMOJI_RIPETUTE",
      new ModerationMessage(
        "Testo non valido",
        "La segnalazione contiene un numero eccessivo di emoji ripetute."
      ),
    ],

    [
      "MAIUSCOLO_ECCESSIVO",
      new ModerationMessage(
        "Uso eccessivo di maiuscole",
        "Evita di scrivere l'intera segnalazione in maiuscolo."
      ),
    ],

    [
      "LINK_MULTIPLI",
      new ModerationMessage(
        "Link non consentiti",
        "Non è consentito inserire link nelle segnalazioni."
      ),
    ],

    [
      "EMAIL_MULTIPLE",
      new ModerationMessage(
        "Email non consentita",
        "Non è consentito inserire indirizzi email nelle segnalazioni."
      ),
    ],

    [
      "NUMERI_TELEFONICI_MULTIPLI",
      new ModerationMessage(
        "Numero di telefono non consentito",
        "Non è consentito inserire numeri di telefono nelle segnalazioni."
      ),
    ],

    [
      "PATTERN_PUBBLICITARIO",
      new ModerationMessage(
        "Pubblicità non consentita",
        "Le segnalazioni non possono contenere messaggi promozionali."
      ),
    ],

    [
      "PAROLE_CHIAVE_SPAM",
      new ModerationMessage(
        "Contenuto spam",
        "La segnalazione contiene parole comunemente associate allo spam."
      ),
    ],

    [
      "PUBBLICITA",
      new ModerationMessage(
        "Pubblicità non consentita",
        "Le segnalazioni non possono essere utilizzate per fini promozionali."
      ),
    ],

    // -----------------------------------------------------------------------
    // Linguaggio
    // -----------------------------------------------------------------------

    [
      "HATE_SPEECH",
      new ModerationMessage(
        "Linguaggio discriminatorio",
        "La segnalazione contiene espressioni discriminatorie o offensive."
      ),
    ],

    [
      "BESTEMMIE",
      new ModerationMessage(
        "Linguaggio non consentito",
        "La segnalazione contiene espressioni non consentite."
      ),
    ],

    [
      "PAROLACCE",
      new ModerationMessage(
        "Linguaggio non consentito",
        "La segnalazione contiene un linguaggio non consentito."
      ),
    ],

    // -----------------------------------------------------------------------
    // Qualità del testo
    // -----------------------------------------------------------------------

    [
      "SOLO_EMOJI",
      new ModerationMessage(
        "Testo non valido",
        "La segnalazione deve contenere una descrizione e non solo emoji."
      ),
    ],

    [
      "SOLO_PUNTEGGIATURA",
      new ModerationMessage(
        "Testo non valido",
        "La segnalazione contiene solo segni di punteggiatura."
      ),
    ],

    [
      "TESTO_TROPPO_BREVE",
      new ModerationMessage(
        "Descrizione insufficiente",
        "Inserisci una descrizione più significativa della situazione."
      ),
    ],

    [
      "TESTO_NON_SIGNIFICATIVO",
      new ModerationMessage(
        "Testo non significativo",
        "Il testo inserito non sembra descrivere una situazione reale."
      ),
    ],

    // -----------------------------------------------------------------------
    // Sicurezza
    // -----------------------------------------------------------------------

    [
      "PHISHING",
      new ModerationMessage(
        "Contenuto non consentito",
        "La segnalazione contiene contenuti potenzialmente fraudolenti."
      ),
    ],

    // -----------------------------------------------------------------------
    // Privacy
    // -----------------------------------------------------------------------

    [
      "DATI_PERSONALI_RILEVATI",
      new ModerationMessage(
        "Dati personali rilevati",
        "La segnalazione contiene dati personali che non possono essere pubblicati."
      ),
    ],

    [
      "VOLTO_RILEVATO",
      new ModerationMessage(
        "Volto rilevato",
        "L'immagine contiene un volto e richiede una verifica."
      ),
    ],

    [
      "TARGA_RILEVATA",
      new ModerationMessage(
        "Targa rilevata",
        "L'immagine contiene una targa e richiede una verifica."
      ),
    ],

    // -----------------------------------------------------------------------
    // Copyright
    // -----------------------------------------------------------------------

    [
      "COPYRIGHT",
      new ModerationMessage(
        "Contenuto protetto",
        "Il contenuto potrebbe violare diritti d'autore."
      ),
    ],
  ]);

  /**
   * Restituisce il messaggio da mostrare
   * all'utente.
   */
  resolve(
    evidenze: readonly ModerationEvidence[]
  ): ModerationMessage {

    /**
     * Tutte le violazioni riguardanti
     * le immagini producono lo stesso
     * messaggio utente.
     */
    for (const evidenza of evidenze) {
      if (
        ModerationMessageResolver.IMAGE_EVIDENCES.has(
          evidenza.tipo
        )
      ) {
        return ModerationMessageResolver.IMAGE_MODERATION_MESSAGE;
      }
    }

    /**
     * Gestione delle altre evidenze.
     */
    for (const evidenza of evidenze) {
      const message =
        ModerationMessageResolver.MESSAGES.get(
          evidenza.tipo
        );

      if (message) {
        return message;
      }
    }

    return new ModerationMessage(
      "Segnalazione rifiutata",
      "La segnalazione non rispetta le regole della community."
    );
  }

}