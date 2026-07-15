import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";
/**
 * Rileva la presenza di un codice IBAN
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class IbanPresenceRule implements SpamRule {
    /**
     * Espressione regolare utilizzata per
     * individuare codici IBAN.
     *
     * Non viene eseguita la validazione
     * formale dell'IBAN.
     */
    private static readonly IBAN_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=IbanPresenceRule.d.ts.map