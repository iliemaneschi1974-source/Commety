import { ReputationContext } from "../ReputationContext";
/**
 * Builder utilizzato esclusivamente nei test
 * del Reputation Engine.
 *
 * Consente di creare rapidamente contesti
 * di reputazione leggibili e privi di duplicazione.
 */
export declare class ReputationContextBuilder {
    private readonly segnali;
    static create(): ReputationContextBuilder;
    conReportConfermatoNelTempo(): this;
    conReportSmentito(): this;
    conSegnalazionePrecisa(): this;
    conSpam(): this;
    conContenutoLimitato(): this;
    conContenutoRimosso(): this;
    conConfermaCommunity(numero?: number): this;
    build(): ReputationContext;
}
//# sourceMappingURL=ReputationContextBuilder.d.ts.map