/**
 * Rappresenta il risultato della valutazione
 * di affidabilità di una segnalazione.
 *
 * Il valore è espresso nell'intervallo [0, 1].
 */
export interface TrustScore {
    /**
     * Livello di affidabilità calcolato.
     *
     * 0 = nessuna fiducia
     * 1 = massima fiducia
     */
    readonly value: number;
    /**
     * Livello di confidenza della valutazione.
     *
     * Anche questo valore è espresso nell'intervallo [0, 1].
     */
    readonly confidence: number;
    /**
     * Motivazione della valutazione.
     *
     * Utilizzabile per debugging, auditing e spiegazioni.
     */
    readonly reason: string;
}
//# sourceMappingURL=TrustScore.d.ts.map