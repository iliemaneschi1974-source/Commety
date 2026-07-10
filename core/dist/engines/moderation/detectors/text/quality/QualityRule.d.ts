import { UserContent } from "../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../ModerationEvidence";
/**
 * Contratto implementato da tutte le regole
 * appartenenti alla famiglia Quality.
 *
 * Ogni regola osserva un singolo fenomeno
 * relativo alla qualità del contenuto.
 */
export interface QualityRule {
    /**
     * Analizza il contenuto.
     *
     * @param contenuto Contenuto fornito dall'utente.
     * @returns Evidenze prodotte dalla regola.
     */
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=QualityRule.d.ts.map