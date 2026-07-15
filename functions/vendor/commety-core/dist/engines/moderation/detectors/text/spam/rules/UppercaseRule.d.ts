import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva un utilizzo eccessivo di lettere maiuscole
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export declare class UppercaseRule implements SpamRule {
    /**
     * Percentuale minima di lettere maiuscole
     * necessaria per produrre un'evidenza.
     */
    private static readonly PERCENTUALE_MINIMA;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=UppercaseRule.d.ts.map