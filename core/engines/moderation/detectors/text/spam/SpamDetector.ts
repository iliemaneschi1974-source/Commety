import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
import { SpamRule } from "./SpamRule";

/**
 * Detector responsabile dell'orchestrazione delle regole
 * euristiche dedicate al rilevamento dello spam.
 *
 * Il detector non prende decisioni e non assegna punteggi.
 * Si limita ad eseguire tutte le regole configurate e a
 * raccogliere le evidenze prodotte.
 */
export class SpamDetector {
  constructor(
    private readonly rules: readonly SpamRule[]
  ) {}

  /**
   * Analizza il contenuto utilizzando tutte le regole
   * configurate e restituisce le evidenze raccolte.
   *
   * @param contenuto Contenuto fornito dall'utente.
   * @returns Tutte le evidenze prodotte dalle regole.
   */
  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    const evidenze: ModerationEvidence[] = [];

    for (const rule of this.rules) {
      evidenze.push(...rule.analizza(contenuto));
    }

    return evidenze;
  }
}