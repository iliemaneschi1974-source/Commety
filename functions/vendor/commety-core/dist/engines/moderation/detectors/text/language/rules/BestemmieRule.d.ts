import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { SpamRule } from "../../spam/SpamRule";
/**
 * Rileva la presenza di bestemmie
 * all'interno del testo.
 *
 * La regola osserva esclusivamente questo
 * fenomeno e produce una singola evidenza
 * di moderazione.
 */
export declare class BestemmieRule implements SpamRule {
    /**
     * Elenco iniziale delle bestemmie.
     *
     * L'elenco è volutamente ridotto e potrà
     * essere ampliato nel tempo.
     */
    private static readonly BESTEMMIE;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=BestemmieRule.d.ts.map