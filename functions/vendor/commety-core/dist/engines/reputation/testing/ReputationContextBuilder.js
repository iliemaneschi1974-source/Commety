"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationContextBuilder = void 0;
const ReputationContext_1 = require("../ReputationContext");
const ReputationSignalBuilder_1 = require("./ReputationSignalBuilder");
/**
 * Builder utilizzato esclusivamente nei test
 * del Reputation Engine.
 *
 * Consente di creare rapidamente contesti
 * di reputazione leggibili e privi di duplicazione.
 */
class ReputationContextBuilder {
    segnali = [];
    static create() {
        return new ReputationContextBuilder();
    }
    conReportConfermatoNelTempo() {
        this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
            .reportConfermatoNelTempo()
            .build());
        return this;
    }
    conReportSmentito() {
        this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
            .reportSmentito()
            .build());
        return this;
    }
    conSegnalazionePrecisa() {
        this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
            .segnalazionePrecisa()
            .build());
        return this;
    }
    conSpam() {
        this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
            .segnalazioneSpam()
            .build());
        return this;
    }
    conContenutoLimitato() {
        this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
            .contenutoLimitato()
            .build());
        return this;
    }
    conContenutoRimosso() {
        this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
            .contenutoRimosso()
            .build());
        return this;
    }
    conConfermaCommunity(numero = 1) {
        for (let i = 0; i < numero; i++) {
            this.segnali.push(ReputationSignalBuilder_1.ReputationSignalBuilder.create()
                .confermaCommunity()
                .build());
        }
        return this;
    }
    build() {
        return new ReputationContext_1.ReputationContext(this.segnali);
    }
}
exports.ReputationContextBuilder = ReputationContextBuilder;
//# sourceMappingURL=ReputationContextBuilder.js.map