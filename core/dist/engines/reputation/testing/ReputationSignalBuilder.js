"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReputationSignalBuilder = void 0;
const ReputationSignal_1 = require("../ReputationSignal");
/**
 * Builder utilizzato esclusivamente nei test
 * del Reputation Engine.
 *
 * Consente di creare rapidamente segnali di dominio
 * mantenendo i test leggibili e privi di duplicazione.
 */
class ReputationSignalBuilder {
    tipo = "REPORT_PUBBLICATO";
    timestamp = new Date();
    origine = "PUBLICATION";
    metadata = {};
    static create() {
        return new ReputationSignalBuilder();
    }
    reportPubblicato() {
        this.tipo = "REPORT_PUBBLICATO";
        this.origine = "PUBLICATION";
        return this;
    }
    reportConfermatoNelTempo() {
        this.tipo = "REPORT_CONFERMATO_NEL_TEMPO";
        this.origine = "LIFECYCLE";
        return this;
    }
    reportSmentito() {
        this.tipo = "REPORT_SMENTITO";
        this.origine = "PUBLICATION";
        return this;
    }
    segnalazionePrecisa() {
        this.tipo = "SEGNALAZIONE_PRECISA";
        this.origine = "PUBLICATION";
        return this;
    }
    confermaCommunity() {
        this.tipo = "CONFERMA_COMMUNITY";
        this.origine = "COMMUNITY";
        return this;
    }
    contenutoLimitato() {
        this.tipo = "CONTENUTO_LIMITATO";
        this.origine = "MODERATION";
        return this;
    }
    contenutoRimosso() {
        this.tipo = "CONTENUTO_RIMOSSO";
        this.origine = "MODERATION";
        return this;
    }
    segnalazioneSpam() {
        this.tipo = "SEGNALAZIONE_SPAM";
        this.origine = "MODERATION";
        return this;
    }
    conTimestamp(timestamp) {
        this.timestamp = timestamp;
        return this;
    }
    conMetadata(metadata) {
        this.metadata = metadata;
        return this;
    }
    build() {
        return new ReputationSignal_1.ReputationSignal(this.tipo, this.timestamp, this.origine, this.metadata);
    }
}
exports.ReputationSignalBuilder = ReputationSignalBuilder;
//# sourceMappingURL=ReputationSignalBuilder.js.map