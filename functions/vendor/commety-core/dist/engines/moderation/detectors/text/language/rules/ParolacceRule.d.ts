import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";
/**
 * Rileva la presenza di termini volgari
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class ParolacceRule implements SpamRule {
    /**
     * Elenco iniziale dei termini volgari.
     */
    private static readonly PAROLACCE;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=ParolacceRule.d.ts.map