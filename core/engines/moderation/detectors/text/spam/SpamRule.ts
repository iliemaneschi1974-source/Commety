import { ModerationEvidence } from "../../../ModerationEvidence";
import { UserContent } from "../../../../../domain/UserContent";

/**
 * Contratto comune per tutte le regole euristiche
 * dedicate al rilevamento dello spam.
 *
 * Ogni implementazione osserva un singolo fenomeno
 * del dominio e produce esclusivamente evidenze
 * di moderazione.
 *
 * La regola non prende decisioni e non assegna
 * punteggi: tali responsabilità appartengono al
 * ModerationEngine e alla ModerationPolicy.
 */
export interface SpamRule {
  /**
   * Analizza il contenuto fornito e restituisce
   * le evidenze di moderazione rilevate.
   *
   * @param contenuto Contenuto fornito dall'utente.
   * @returns Le evidenze prodotte dalla regola.
   */
  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[];
}