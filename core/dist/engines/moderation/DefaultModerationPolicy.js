"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModerationPolicy = void 0;
const ModerationDecision_1 = require("./ModerationDecision");
/**
 * Implementazione predefinita della Policy di moderazione.
 *
 * Interpreta le evidenze prodotte dagli analyzer e determina
 * la decisione finale del Moderation Engine.
 */
class DefaultModerationPolicy {
    /**
     * Violazioni che comportano il rifiuto
     * immediato del contenuto.
     */
    static VIOLAZIONI_BLOCCANTI = new Set([
        // Sicurezza immagini
        "IMMAGINE_PORNOGRAFICA",
        "IMMAGINE_CON_NUDITA",
        "IMMAGINE_VIOLENTA",
        "IMMAGINE_CRUENTA",
        // Qualità immagini
        "WATERMARK",
        "SCREENSHOT",
        "MEME",
        "IMMAGINE_AI",
        "IMMAGINE_DUPLICATA",
        "CONTENUTO_NON_PERTINENTE",
        "IMMAGINE_NON_COERENTE",
        // Linguaggio
        "HATE_SPEECH",
        "BESTEMMIE",
        "PAROLACCE",
        // Qualità del testo
        "TESTO_NON_SIGNIFICATIVO",
        "SOLO_EMOJI",
        "SOLO_PUNTEGGIATURA",
        "TESTO_TROPPO_BREVE",
        // Spam
        "SPAM",
        "CARATTERI_RIPETUTI",
        "PAROLE_RIPETUTE",
        "EMOJI_RIPETUTE",
        "MAIUSCOLO_ECCESSIVO",
        "LINK_MULTIPLI",
        "EMAIL_MULTIPLE",
        "NUMERI_TELEFONICI_MULTIPLI",
        "PATTERN_PUBBLICITARIO",
        "PAROLE_CHIAVE_SPAM",
        "PUBBLICITA",
        // Privacy
        "DATI_PERSONALI_RILEVATI",
        // Sicurezza
        "PHISHING",
    ]);
    /**
     * Violazioni che richiedono una revisione
     * manuale da parte della piattaforma.
     */
    static VIOLAZIONI_REVISIONE = new Set([
        "VOLTO_RILEVATO",
        "TARGA_RILEVATA",
        "COPYRIGHT",
    ]);
    /**
     * Violazioni che limitano il contenuto.
     *
     * Attualmente la Policy v1.0 non utilizza
     * questa categoria, che rimane disponibile
     * per future evoluzioni del dominio.
     */
    static VIOLAZIONI_LIMITANTI = new Set();
    valuta(evidenze) {
        if (this.contieneViolazione(evidenze, DefaultModerationPolicy.VIOLAZIONI_BLOCCANTI)) {
            return ModerationDecision_1.ModerationDecision.rifiutato();
        }
        if (this.contieneViolazione(evidenze, DefaultModerationPolicy.VIOLAZIONI_REVISIONE)) {
            return ModerationDecision_1.ModerationDecision.revisioneManuale();
        }
        if (this.contieneViolazione(evidenze, DefaultModerationPolicy.VIOLAZIONI_LIMITANTI)) {
            return ModerationDecision_1.ModerationDecision.limitato();
        }
        return ModerationDecision_1.ModerationDecision.approvato();
    }
    contieneViolazione(evidenze, categorie) {
        return evidenze.some((evidenza) => categorie.has(evidenza.tipo));
    }
}
exports.DefaultModerationPolicy = DefaultModerationPolicy;
//# sourceMappingURL=DefaultModerationPolicy.js.map