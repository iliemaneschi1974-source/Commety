import { ReputationSignal } from "../ReputationSignal";
/**
 * Builder utilizzato esclusivamente nei test
 * del Reputation Engine.
 *
 * Consente di creare rapidamente segnali di dominio
 * mantenendo i test leggibili e privi di duplicazione.
 */
export declare class ReputationSignalBuilder {
    private tipo;
    private timestamp;
    private origine;
    private metadata;
    static create(): ReputationSignalBuilder;
    reportPubblicato(): this;
    reportConfermatoNelTempo(): this;
    reportSmentito(): this;
    segnalazionePrecisa(): this;
    confermaCommunity(): this;
    contenutoLimitato(): this;
    contenutoRimosso(): this;
    segnalazioneSpam(): this;
    conTimestamp(timestamp: Date): this;
    conMetadata(metadata: Readonly<Record<string, unknown>>): this;
    build(): ReputationSignal;
}
//# sourceMappingURL=ReputationSignalBuilder.d.ts.map