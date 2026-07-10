import { UserContent } from "../../../domain/UserContent";

import { ModerationEvidence } from "../ModerationEvidence";

/**
 * Definisce il contratto comune di un analyzer di moderazione.
 *
 * Un analyzer osserva un contenuto fornito dall'utente
 * e produce una o più evidenze di moderazione.
 *
 * Non interpreta le evidenze e non prende decisioni.
 */
export interface ModerationAnalyzer {
  /**
   * Analizza il contenuto dell'utente e produce
   * le evidenze rilevate.
   */
  analizza(
    userContent: UserContent
  ): readonly ModerationEvidence[];
}