/**
 * ============================================================================
 * COMMETY CORE
 * Domain Event
 * ----------------------------------------------------------------------------
 * ObservationReceived
 *
 * Viene emesso quando una nuova Observation entra nel Commety Core.
 *
 * È il primo evento del dominio e rappresenta l'ingresso di una nuova
 * osservazione nel processo decisionale.
 * ============================================================================
 */
export interface ObservationReceived {
    /**
     * Identificatore dell'evento.
     */
    readonly id: string;
    /**
     * Observation coinvolta.
     */
    readonly observationId: string;
    /**
     * Istante di emissione dell'evento.
     */
    readonly occurredAt: Date;
}
//# sourceMappingURL=ObservationReceived.d.ts.map