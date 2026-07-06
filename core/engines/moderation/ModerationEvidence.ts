/**
 * Rappresenta una singola evidenza prodotta durante
 * il processo di moderazione dei contenuti.
 *
 * L'evidenza descrive un fatto rilevato dagli analyzer,
 * senza esprimere alcuna decisione finale.
 */
export class ModerationEvidence {
  constructor(
    /**
     * Categoria dell'evidenza rilevata.
     */
    public readonly tipo: ModerationEvidenceType,

    /**
     * Descrizione leggibile dell'evidenza.
     */
    public readonly descrizione: string,

    /**
     * Livello di confidenza dell'analisi.
     *
     * Valore compreso tra 0 e 1.
     */
    public readonly confidenza: number,

    /**
     * Origine dell'evidenza.
     */
    public readonly origine: ModerationEvidenceSource
  ) {}

  equals(other: ModerationEvidence): boolean {
    return (
      this.tipo === other.tipo &&
      this.descrizione === other.descrizione &&
      this.confidenza === other.confidenza &&
      this.origine === other.origine
    );
  }
}

/**
 * Tipologie di evidenze supportate dal Moderation Engine.
 *
 * L'elenco potrà essere esteso senza modificare
 * il funzionamento del motore.
 */
export type ModerationEvidenceType =
  // Contenuti sensibili
  | "PORNOGRAFIA"
  | "NUDITA"
  | "VIOLENZA"
  | "SANGUE"

  // Linguaggio
  | "HATE_SPEECH"
  | "PAROLACCE"
  | "BESTEMMIE"

  // Spam
  | "SPAM"
  | "CARATTERI_RIPETUTI"
  | "PAROLE_RIPETUTE"
  | "EMOJI_RIPETUTE"
  | "MAIUSCOLO_ECCESSIVO"
  | "URL_PRESENTE"
  | "EMAIL_PRESENTE"
  | "NUMERO_TELEFONICO_PRESENTE"
  | "PATTERN_PUBBLICITARIO"
  | "PAROLE_CHIAVE_SPAM"

  // Sicurezza
  | "PHISHING"

  // Image Safety
  | "IMMAGINE_PORNOGRAFICA"
  | "IMMAGINE_CON_NUDITA"
  | "MINORI_RILEVATI"
  | "IMMAGINE_VIOLENTA"
  | "IMMAGINE_CRUENTA"
  | "ARMI_RILEVATE"
  | "MALTRATTAMENTO_ANIMALI"

  // Promozione
  | "PUBBLICITA"

  // Copyright
  | "COPYRIGHT"

  // Qualità immagini
  | "WATERMARK"
  | "SCREENSHOT"
  | "MEME"
  | "IMMAGINE_AI"
  | "IMMAGINE_DUPLICATA"

  // Privacy
  | "VOLTO"
  | "TARGA"
  | "DATI_PERSONALI"
  | "CODICE_FISCALE_PRESENTE"
  | "IBAN_PRESENTE"
  | "CARTA_PAGAMENTO_PRESENTE"

  // Coerenza
  | "CONTENUTO_NON_PERTINENTE"

  // Contenuti multimediali
  | "AUDIO_NON_CONFORME"
  | "VIDEO_NON_CONFORME"

  // Generico
  | "ALTRO";

/**
 * Origine dell'evidenza.
 */
export type ModerationEvidenceSource =
  | "TESTO"
  | "IMMAGINE"
  | "VIDEO"
  | "AUDIO"
  | "OCR"
  | "AI"
  | "MANUALE";