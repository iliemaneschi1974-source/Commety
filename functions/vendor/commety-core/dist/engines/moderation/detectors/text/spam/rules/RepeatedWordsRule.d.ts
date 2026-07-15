import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva la ripetizione consecutiva della stessa parola
 * all'interno del testo.
 *
 * Esempi:
 *
 * "compra compra compra compra compra compra"
 * "ciao ciao ciao ciao ciao ciao"
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export declare class RepeatedWordsRule implements SpamRule {
    /**
     * Numero minimo di parole consecutive uguali
     * necessario per produrre un'evidenza.
     */
    private static readonly MINIMO_PAROLE_CONSECUTIVE;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=RepeatedWordsRule.d.ts.map