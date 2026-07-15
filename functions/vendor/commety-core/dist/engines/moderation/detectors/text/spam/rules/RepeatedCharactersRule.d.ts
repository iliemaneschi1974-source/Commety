import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../SpamRule";
/**
 * Rileva l'utilizzo eccessivo dello stesso carattere
 * consecutivo all'interno del testo.
 *
 * Esempi:
 *
 * "!!!!!!!!!!"
 * "AAAAAAAAAA"
 * ".........."
 *
 * La regola osserva esclusivamente questo fenomeno
 * e produce una singola evidenza di moderazione.
 */
export declare class RepeatedCharactersRule implements SpamRule {
    /**
     * Numero minimo di caratteri consecutivi uguali
     * necessario per produrre un'evidenza.
     */
    private static readonly MINIMO_CARATTERI_CONSECUTIVI;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=RepeatedCharactersRule.d.ts.map