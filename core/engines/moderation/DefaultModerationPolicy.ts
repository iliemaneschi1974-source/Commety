import {
  ModerationEvidence,
  ModerationEvidenceType,
} from "./ModerationEvidence";
import { ModerationDecision } from "./ModerationDecision";
import { ModerationPolicy } from "./ModerationPolicy";

/**
 * Implementazione predefinita della Policy di moderazione.
 *
 * Interpreta le evidenze prodotte dagli analyzer e determina
 * la decisione finale del Moderation Engine.
 */
export class DefaultModerationPolicy
  implements ModerationPolicy
{
  /**
   * Violazioni che comportano il rifiuto
   * immediato del contenuto.
   */
  private static readonly VIOLAZIONI_BLOCCANTI =
    new Set<ModerationEvidenceType>([
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
  private static readonly VIOLAZIONI_REVISIONE =
    new Set<ModerationEvidenceType>([
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
  private static readonly VIOLAZIONI_LIMITANTI =
    new Set<ModerationEvidenceType>();

  valuta(
    evidenze: readonly ModerationEvidence[]
  ): ModerationDecision {
    if (
      this.contieneViolazione(
        evidenze,
        DefaultModerationPolicy.VIOLAZIONI_BLOCCANTI
      )
    ) {
      return ModerationDecision.rifiutato();
    }

    if (
      this.contieneViolazione(
        evidenze,
        DefaultModerationPolicy.VIOLAZIONI_REVISIONE
      )
    ) {
      return ModerationDecision.revisioneManuale();
    }

    if (
      this.contieneViolazione(
        evidenze,
        DefaultModerationPolicy.VIOLAZIONI_LIMITANTI
      )
    ) {
      return ModerationDecision.limitato();
    }

    return ModerationDecision.approvato();
  }

  private contieneViolazione(
    evidenze: readonly ModerationEvidence[],
    categorie: ReadonlySet<ModerationEvidenceType>
  ): boolean {
    return evidenze.some((evidenza) =>
      categorie.has(evidenza.tipo)
    );
  }
}