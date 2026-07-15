/**
 * Definisce le soglie decisionali del Publication Engine.
 *
 * Tutti i valori sono espressi nell'intervallo [0, 1].
 */
export interface PublicationPolicy {
    /**
     * Soglia per la pubblicazione immediata.
     */
    getPublishThreshold(): number;
    /**
     * Soglia per la pubblicazione con riserva.
     */
    getPublishWithReservationThreshold(): number;
    /**
     * Soglia per richiedere conferme alla community.
     */
    getConfirmationThreshold(): number;
    /**
     * Soglia per inviare la segnalazione in revisione.
     */
    getReviewThreshold(): number;
}
//# sourceMappingURL=PublicationPolicy.d.ts.map