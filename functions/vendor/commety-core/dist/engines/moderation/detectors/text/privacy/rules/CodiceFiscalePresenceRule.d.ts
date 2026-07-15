import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";
/**
 * Rileva la presenza di un codice fiscale
 * italiano all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class CodiceFiscalePresenceRule implements SpamRule {
    /**
     * Espressione regolare utilizzata per
     * individuare codici fiscali italiani.
     *
     * Non viene eseguita la validazione
     * del carattere di controllo.
     */
    private static readonly CODICE_FISCALE_REGEX;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=CodiceFiscalePresenceRule.d.ts.map