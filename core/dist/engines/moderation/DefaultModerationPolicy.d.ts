import { ModerationEvidence } from "./ModerationEvidence";
import { ModerationDecision } from "./ModerationDecision";
import { ModerationPolicy } from "./ModerationPolicy";
/**
 * Implementazione predefinita della Policy di moderazione.
 *
 * Interpreta le evidenze prodotte dagli analyzer e determina
 * la decisione finale del Moderation Engine.
 */
export declare class DefaultModerationPolicy implements ModerationPolicy {
    /**
     * Violazioni che comportano il rifiuto
     * immediato del contenuto.
     */
    private static readonly VIOLAZIONI_BLOCCANTI;
    /**
     * Violazioni che richiedono una revisione
     * manuale da parte della piattaforma.
     */
    private static readonly VIOLAZIONI_REVISIONE;
    /**
     * Violazioni che limitano il contenuto.
     *
     * Attualmente la Policy v1.0 non utilizza
     * questa categoria, che rimane disponibile
     * per future evoluzioni del dominio.
     */
    private static readonly VIOLAZIONI_LIMITANTI;
    valuta(evidenze: readonly ModerationEvidence[]): ModerationDecision;
    private contieneViolazione;
}
//# sourceMappingURL=DefaultModerationPolicy.d.ts.map