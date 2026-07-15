import { TrustEvidence } from "./TrustEvidence";
import { TrustScore } from "./TrustScore";
/**
 * Contratto del motore di valutazione
 * dell'affidabilità di una segnalazione.
 *
 * Il TrustScorer sintetizza le evidenze prodotte
 * dal Protection Engine in un unico TrustScore.
 */
export interface TrustScorer {
    /**
     * Calcola il livello di affidabilità
     * della segnalazione.
     *
     * @param evidence Evidenze raccolte dal Protection Engine.
     * @returns TrustScore risultante.
     */
    score(evidence: TrustEvidence): TrustScore;
}
//# sourceMappingURL=TrustScorer.d.ts.map