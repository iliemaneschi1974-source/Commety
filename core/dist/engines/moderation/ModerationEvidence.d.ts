/**
 * Rappresenta una singola evidenza prodotta durante
 * il processo di moderazione dei contenuti.
 *
 * L'evidenza descrive un fatto rilevato dagli analyzer,
 * senza esprimere alcuna decisione finale.
 */
export declare class ModerationEvidence {
    /**
     * Categoria dell'evidenza rilevata.
     */
    readonly tipo: ModerationEvidenceType;
    /**
     * Descrizione leggibile dell'evidenza.
     */
    readonly descrizione: string;
    /**
     * Livello di confidenza dell'analisi.
     *
     * Valore compreso tra 0 e 1.
     */
    readonly confidenza: number;
    /**
     * Origine dell'evidenza.
     */
    readonly origine: ModerationEvidenceSource;
    constructor(
    /**
     * Categoria dell'evidenza rilevata.
     */
    tipo: ModerationEvidenceType, 
    /**
     * Descrizione leggibile dell'evidenza.
     */
    descrizione: string, 
    /**
     * Livello di confidenza dell'analisi.
     *
     * Valore compreso tra 0 e 1.
     */
    confidenza: number, 
    /**
     * Origine dell'evidenza.
     */
    origine: ModerationEvidenceSource);
    equals(other: ModerationEvidence): boolean;
}
/**
 * Tipologie di evidenze supportate dal Moderation Engine.
 *
 * Ogni evidenza descrive un fenomeno specifico del dominio.
 * I nomi sono volutamente espliciti per evitare ambiguità
 * tra testo, immagini, video e audio.
 */
export type ModerationEvidenceType = "IMMAGINE_PORNOGRAFICA" | "IMMAGINE_CON_NUDITA" | "IMMAGINE_VIOLENTA" | "IMMAGINE_CRUENTA" | "ARMI_RILEVATE" | "MINORI_RILEVATI" | "MALTRATTAMENTO_ANIMALI" | "HATE_SPEECH" | "BESTEMMIE" | "PAROLACCE" | "TESTO_NON_SIGNIFICATIVO" | "SOLO_EMOJI" | "SOLO_PUNTEGGIATURA" | "TESTO_TROPPO_BREVE" | "SPAM" | "CARATTERI_RIPETUTI" | "PAROLE_RIPETUTE" | "EMOJI_RIPETUTE" | "MAIUSCOLO_ECCESSIVO" | "LINK_MULTIPLI" | "EMAIL_MULTIPLE" | "NUMERI_TELEFONICI_MULTIPLI" | "PATTERN_PUBBLICITARIO" | "PAROLE_CHIAVE_SPAM" | "PHISHING" | "PUBBLICITA" | "COPYRIGHT" | "WATERMARK" | "SCREENSHOT" | "MEME" | "IMMAGINE_AI" | "IMMAGINE_DUPLICATA" | "VOLTO_RILEVATO" | "TARGA_RILEVATA" | "DATI_PERSONALI_RILEVATI" | "CONTENUTO_NON_PERTINENTE" | "AUDIO_NON_CONFORME" | "VIDEO_NON_CONFORME" | "ALTRO";
/**
 * Origine dell'evidenza.
 */
export type ModerationEvidenceSource = "TESTO" | "IMMAGINE" | "VIDEO" | "AUDIO" | "OCR" | "AI" | "MANUALE";
//# sourceMappingURL=ModerationEvidence.d.ts.map