import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { ModerationEvidence, ModerationEvidenceType } from "../../ModerationEvidence";
import { ImageRule } from "./ImageRule";
/**
 * Classe base per tutte le ImageRule.
 *
 * Fornisce il contratto comune e le funzionalità
 * condivise tra le regole di moderazione immagini.
 */
export declare abstract class AbstractImageRule implements ImageRule {
    /**
     * Analizza una singola immagine.
     */
    abstract analizza(analisi: ImageAnalysis): readonly ModerationEvidence[];
    /**
     * Crea una nuova evidenza di moderazione
     * con origine IMMAGINE.
     *
     * Tutte le ImageRule utilizzano questo metodo
     * per mantenere uniforme la creazione delle evidenze.
     */
    protected creaEvidence(tipo: ModerationEvidenceType, descrizione: string, confidenza: number): ModerationEvidence;
}
//# sourceMappingURL=AbstractImageRule.d.ts.map