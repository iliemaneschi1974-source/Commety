import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { ModerationDecision } from "./ModerationDecision";

/**
 * Definisce il contratto del Moderation Engine.
 *
 * Il Moderation Engine rappresenta il punto di ingresso
 * dell'intero processo di moderazione dei contenuti.
 *
 * L'implementazione concreta è responsabile di:
 * - eseguire gli analyzer;
 * - raccogliere le evidenze;
 * - applicare la ModerationPolicy;
 * - restituire la decisione finale.
 */
export interface ModerationEngine {
  /**
   * Modera il contenuto fornito dall'utente.
   *
   * @param contenuto Contenuto da analizzare.
   * @param immagine Eventuale analisi dell'immagine associata.
   * @returns Decisione finale della moderazione.
   */
  modera(
    contenuto: UserContent,
    immagine?: ImageAnalysis
  ): ModerationDecision;
}