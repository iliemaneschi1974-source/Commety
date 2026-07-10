/**
 * ============================================================================
 * COMMETY CORE
 * Application Layer
 * ----------------------------------------------------------------------------
 * CommettyCore
 *
 * Punto di ingresso ufficiale del Commetty Core.
 *
 * Tutte le richieste verso il Core devono passare da questa classe.
 *
 * Responsabilità:
 * - Ricevere le richieste dell'applicazione.
 * - Orchestrare gli Engine.
 * - Esporre le capability del Core.
 *
 * Non contiene logiche di business.
 * ============================================================================
 */
import type { Assessment } from "../domain/Assessment";
import type { ImageAnalysis } from "../domain/ImageAnalysis";
import type { Observation } from "../domain/Observation";
import type { UserContent } from "../domain/UserContent";
import type { ProtectionEngine } from "../engines/protection/ProtectionEngine";
import type { ModerationEngine } from "../engines/moderation/ModerationEngine";
import { ModerationResult } from "../engines/moderation/ModerationResult";
export declare class CommettyCore {
    private readonly protectionEngine;
    private readonly moderationEngine;
    constructor(protectionEngine?: ProtectionEngine, moderationEngine?: ModerationEngine);
    /**
     * Entry point storico del Protection Engine.
     * Mantenuto per retrocompatibilità.
     */
    process(observation: Observation): Promise<ReadonlyArray<Assessment>>;
    /**
     * Entry point del Moderation Engine.
     */
    moderate(contenuto: UserContent, immagine?: ImageAnalysis): ModerationResult;
}
//# sourceMappingURL=CommettyCore.d.ts.map