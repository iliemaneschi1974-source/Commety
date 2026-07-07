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
 * Ogni evidenza descrive un fenomeno specifico del dominio.
 * I nomi sono volutamente espliciti per evitare ambiguità
 * tra testo, immagini, video e audio.
 */
export type ModerationEvidenceType =
  // Sicurezza immagini
  | "IMMAGINE_PORNOGRAFICA"
  | "IMMAGINE_CON_NUDITA"
  | "IMMAGINE_VIOLENTA"
  | "IMMAGINE_CRUENTA"
  | "ARMI_RILEVATE"
  | "MINORI_RILEVATI"
  | "MALTRATTAMENTO_ANIMALI"

  // Linguaggio
  | "HATE_SPEECH"

  // Spam
  | "SPAM"
  | "CARATTERI_RIPETUTI"
  | "PAROLE_RIPETUTE"
  | "EMOJI_RIPETUTE"
  | "MAIUSCOLO_ECCESSIVO"
  | "LINK_MULTIPLI"
  | "EMAIL_MULTIPLE"
  | "NUMERI_TELEFONICI_MULTIPLI"
  | "PATTERN_PUBBLICITARIO"
  | "PAROLE_CHIAVE_SPAM"

  // Sicurezza
  | "PHISHING"

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
  | "VOLTO_RILEVATO"
  | "TARGA_RILEVATA"
  | "DATI_PERSONALI_RILEVATI"

  // Coerenza
  | "CONTENUTO_NON_PERTINENTE"

  // Multimedia
  | "AUDIO_NON_CONFORME"
  | "VIDEO_NON_CONFORME"

  // Altro
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