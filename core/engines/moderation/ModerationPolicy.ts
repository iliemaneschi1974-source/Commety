import { ModerationDecision } from "./ModerationDecision";
import { ModerationEvidence } from "./ModerationEvidence";

/**
 * Definisce le regole di business della moderazione.
 *
 * La Policy interpreta le evidenze prodotte dagli analyzer
 * e determina la decisione finale del Moderation Engine.
 */
export interface ModerationPolicy {
  /**
   * Valuta le evidenze raccolte durante il processo
   * di moderazione e restituisce la decisione finale.
   */
  valuta(
    evidenze: readonly ModerationEvidence[]
  ): ModerationDecision;
}