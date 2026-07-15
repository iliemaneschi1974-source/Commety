/**
 * ============================================================================
 * COMMETY CORE
 * Protection Engine
 * ----------------------------------------------------------------------------
 *
 * Mission
 * -------
 * Garantire che solo Observation idonee possano entrare
 * nel processo di costruzione della conoscenza.
 *
 * Il Protection Engine NON determina la verità di un Incident.
 *
 * Produce esclusivamente Assessment relativi agli aspetti
 * di protezione dell'Observation.
 *
 * Responsabilità
 * ---------------
 * - Validazione della Source
 * - Protezione da spam e flood
 * - Controllo del linguaggio
 * - Controllo dei contenuti multimediali
 * - Rilevamento di comportamenti anomali
 * - Applicazione delle policy di ingresso
 *
 * Il Protection Engine è il primo Engine eseguito dopo
 * ObservationReceived.
 * ============================================================================
 */
import type { Assessment } from "../../domain/Assessment";
import type { Observation } from "../../domain/Observation";
/**
 * Contratto del Protection Engine.
 *
 * Ogni implementazione dovrà analizzare una Observation
 * e produrre zero, uno o più Assessment.
 *
 * Il Protection Engine NON modifica il dominio.
 * NON crea Incident.
 * NON crea Evidence.
 * NON prende Decision.
 */
export interface ProtectionEngine {
    /**
     * Analizza un'Observation.
     *
     * @returns Una collezione di Assessment prodotti
     *          durante la fase di protezione.
     */
    analyze(observation: Observation): Promise<ReadonlyArray<Assessment>>;
}
//# sourceMappingURL=ProtectionEngine.d.ts.map