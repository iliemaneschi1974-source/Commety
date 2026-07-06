import { PublicationDecision } from "../engines/publication/PublicationDecision";

/**
 * Punto di ingresso del Commetty Core.
 *
 * Coordina l'esecuzione dei motori del Core
 * per produrre la decisione finale sulla
 * pubblicazione di una segnalazione.
 */
export interface ProtectionPipeline {
  /**
   * Esegue l'intera pipeline di protezione.
   *
   * Nella prima versione il contratto è volutamente
   * minimale e verrà esteso nei prossimi sprint.
   */
  execute(): PublicationDecision;
}