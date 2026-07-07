import {
  ReputationSignal,
  ReputationSignalSource,
  ReputationSignalType,
} from "../ReputationSignal";

/**
 * Builder utilizzato esclusivamente nei test
 * del Reputation Engine.
 *
 * Consente di creare rapidamente segnali di dominio
 * mantenendo i test leggibili e privi di duplicazione.
 */
export class ReputationSignalBuilder {
  private tipo: ReputationSignalType =
    "REPORT_PUBBLICATO";

  private timestamp = new Date();

  private origine: ReputationSignalSource =
    "PUBLICATION";

  private metadata: Readonly<Record<string, unknown>> =
    {};

  static create(): ReputationSignalBuilder {
    return new ReputationSignalBuilder();
  }

  reportPubblicato(): this {
    this.tipo = "REPORT_PUBBLICATO";
    this.origine = "PUBLICATION";
    return this;
  }

  reportConfermatoNelTempo(): this {
    this.tipo = "REPORT_CONFERMATO_NEL_TEMPO";
    this.origine = "LIFECYCLE";
    return this;
  }

  reportSmentito(): this {
    this.tipo = "REPORT_SMENTITO";
    this.origine = "PUBLICATION";
    return this;
  }

  segnalazionePrecisa(): this {
    this.tipo = "SEGNALAZIONE_PRECISA";
    this.origine = "PUBLICATION";
    return this;
  }

  confermaCommunity(): this {
    this.tipo = "CONFERMA_COMMUNITY";
    this.origine = "COMMUNITY";
    return this;
  }

  contenutoLimitato(): this {
    this.tipo = "CONTENUTO_LIMITATO";
    this.origine = "MODERATION";
    return this;
  }

  contenutoRimosso(): this {
    this.tipo = "CONTENUTO_RIMOSSO";
    this.origine = "MODERATION";
    return this;
  }

  segnalazioneSpam(): this {
    this.tipo = "SEGNALAZIONE_SPAM";
    this.origine = "MODERATION";
    return this;
  }

  conTimestamp(
    timestamp: Date
  ): this {
    this.timestamp = timestamp;
    return this;
  }

  conMetadata(
    metadata: Readonly<Record<string, unknown>>
  ): this {
    this.metadata = metadata;
    return this;
  }

  build(): ReputationSignal {
    return new ReputationSignal(
      this.tipo,
      this.timestamp,
      this.origine,
      this.metadata
    );
  }
}