import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";

/**
 * Rileva contenuti troppo brevi
 * e privi di reale significato.
 *
 * Ogni riga del contenuto viene analizzata
 * separatamente, così da gestire correttamente
 * titolo e descrizione.
 */
export class TooShortTextRule
  implements QualityRule
{
  /**
   * Parole che, se utilizzate da sole,
   * non costituiscono una segnalazione.
   */
  private static readonly TESTI_NON_VALIDI =
    new Set([
      "ok",
      "ciao",
      "boh",
      "mah",
      "eh",
      "lol",
      "test",
      "prova",
    ]);

  analizza(
    contenuto: UserContent
  ): readonly ModerationEvidence[] {
    if (!contenuto.hasTesto()) {
      return [];
    }

    const righe = contenuto.testo!
      .split("\n")
      .map((riga) => riga.trim().toLowerCase())
      .filter((riga) => riga.length > 0);

    for (const riga of righe) {
      if (
        TooShortTextRule.TESTI_NON_VALIDI.has(
          riga
        )
      ) {
        return [
          new ModerationEvidence(
            "TESTO_TROPPO_BREVE",
            "Il contenuto è troppo breve per rappresentare una segnalazione.",
            1,
            "TESTO"
          ),
        ];
      }
    }

    return [];
  }
}