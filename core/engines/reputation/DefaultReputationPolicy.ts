import { ReputationDecision } from "./ReputationDecision";
import {
  ReputationEvidence,
  ReputationEvidenceType,
} from "./ReputationEvidence";
import { ReputationPolicy } from "./ReputationPolicy";

/**
 * Politica di reputazione predefinita.
 *
 * Interpreta le evidenze disponibili e determina
 * il livello di fiducia dell'utente.
 */
export class DefaultReputationPolicy implements ReputationPolicy {
  private static readonly EVIDENZE_NEGATIVE: readonly ReputationEvidenceType[] =
    [
      "SPAM_RECIDIVO",
      "ABUSO_RECIDIVO",
      "VIOLAZIONI_RIPETUTE",
      "CONTENUTI_RIMOSSI_FREQUENTEMENTE",
      "FIDUCIA_IN_DIMINUZIONE",
    ];

  private static readonly EVIDENZE_POSITIVE: readonly ReputationEvidenceType[] =
    [
      "STORICO_AFFIDABILE",
      "SEGNALAZIONI_PRECISE",
      "SEGNALAZIONI_ATTENDIBILI",
      "CONFERME_FREQUENTI",
      "COLLABORAZIONE_COSTANTE",
      "VALIDATORE_AFFIDABILE",
      "CONTENUTI_DI_QUALITA",
      "FOTO_DI_QUALITA",
      "DESCRIZIONI_COMPLETE",
    ];

  valuta(
    evidenze: readonly ReputationEvidence[]
  ): ReputationDecision {
    const tipi = new Set(
      evidenze.map((e) => e.tipo)
    );

    if (
      DefaultReputationPolicy.EVIDENZE_NEGATIVE.some(
        (tipo) => tipi.has(tipo)
      )
    ) {
      return ReputationDecision.nonAffidabile();
    }

    const tuttePositive =
      evidenze.length > 0 &&
      evidenze.every((e) =>
        DefaultReputationPolicy.EVIDENZE_POSITIVE.includes(
          e.tipo
        )
      );

    if (tuttePositive) {
      return ReputationDecision.altaFiducia();
    }

    return ReputationDecision.fiduciaStandard();
  }
}