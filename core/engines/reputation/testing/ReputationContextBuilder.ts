import { ReputationContext } from "../ReputationContext";
import { ReputationSignal } from "../ReputationSignal";
import { ReputationSignalBuilder } from "./ReputationSignalBuilder";

/**
 * Builder utilizzato esclusivamente nei test
 * del Reputation Engine.
 *
 * Consente di creare rapidamente contesti
 * di reputazione leggibili e privi di duplicazione.
 */
export class ReputationContextBuilder {
  private readonly segnali: ReputationSignal[] = [];

  static create(): ReputationContextBuilder {
    return new ReputationContextBuilder();
  }

  conReportConfermatoNelTempo(): this {
    this.segnali.push(
      ReputationSignalBuilder.create()
        .reportConfermatoNelTempo()
        .build()
    );

    return this;
  }

  conReportSmentito(): this {
    this.segnali.push(
      ReputationSignalBuilder.create()
        .reportSmentito()
        .build()
    );

    return this;
  }

  conSegnalazionePrecisa(): this {
    this.segnali.push(
      ReputationSignalBuilder.create()
        .segnalazionePrecisa()
        .build()
    );

    return this;
  }

  conSpam(): this {
    this.segnali.push(
      ReputationSignalBuilder.create()
        .segnalazioneSpam()
        .build()
    );

    return this;
  }

  conContenutoLimitato(): this {
    this.segnali.push(
      ReputationSignalBuilder.create()
        .contenutoLimitato()
        .build()
    );

    return this;
  }

  conContenutoRimosso(): this {
    this.segnali.push(
      ReputationSignalBuilder.create()
        .contenutoRimosso()
        .build()
    );

    return this;
  }

  conConfermaCommunity(
    numero = 1
  ): this {
    for (let i = 0; i < numero; i++) {
      this.segnali.push(
        ReputationSignalBuilder.create()
          .confermaCommunity()
          .build()
      );
    }

    return this;
  }

  build(): ReputationContext {
    return new ReputationContext(this.segnali);
  }
}