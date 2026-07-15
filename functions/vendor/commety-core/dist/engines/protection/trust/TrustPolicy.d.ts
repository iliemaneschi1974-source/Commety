/**
 * Definisce i pesi utilizzati per calcolare
 * il livello di affidabilità di una segnalazione.
 *
 * Tutti i valori sono espressi nell'intervallo [0, 1].
 */
export interface TrustPolicy {
    /**
     * Peso dell'analisi dei duplicati.
     */
    getDuplicateWeight(): number;
    /**
     * Peso dell'analisi temporale.
     */
    getTemporalWeight(): number;
    /**
     * Peso dell'analisi spaziale.
     */
    getSpatialWeight(): number;
}
//# sourceMappingURL=TrustPolicy.d.ts.map