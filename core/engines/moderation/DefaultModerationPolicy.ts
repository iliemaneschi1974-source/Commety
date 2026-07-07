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
export class DefaultModerationPolicy implements ModerationPolicy {
  private static readonly VIOLAZIONI_BLOCCANTI =
    new Set<ModerationEvidenceType>([
      "IMMAGINE_PORNOGRAFICA",
      "IMMAGINE_CON_NUDITA",
      "IMMAGINE_VIOLENTA",
      "IMMAGINE_CRUENTA",
      "HATE_SPEECH",
      "BESTEMMIE",
      "PHISHING",
    ]);

  private static readonly VIOLAZIONI_REVISIONE =
    new Set<ModerationEvidenceType>([
      "VOLTO_RILEVATO",
      "TARGA_RILEVATA",
      "DATI_PERSONALI_RILEVATI",
      "COPYRIGHT",
    ]);

  private static readonly VIOLAZIONI_LIMITANTI =
    new Set<ModerationEvidenceType>([
      "WATERMARK",
      "SCREENSHOT",
      "MEME",
      "PUBBLICITA",
      "IMMAGINE_AI",
      "IMMAGINE_DUPLICATA",
      "CONTENUTO_NON_PERTINENTE",
    ]);

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