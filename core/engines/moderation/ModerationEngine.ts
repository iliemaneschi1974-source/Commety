import { ModerationDecision } from "./ModerationDecision";
import { ModerationEvidence } from "./ModerationEvidence";

/**
 * Definisce il contratto del Moderation Engine.
 *
 * Il Moderation Engine orchestra il processo di moderazione
 * e restituisce la decisione finale sulla conformità
 * del contenuto alle regole della piattaforma.
 */
export interface ModerationEngine {
  /**
   * Modera il contenuto sulla base delle evidenze
   * prodotte dagli analyzer.
   */
  modera(
    evidenze: readonly ModerationEvidence[]
  ): ModerationDecision;
}