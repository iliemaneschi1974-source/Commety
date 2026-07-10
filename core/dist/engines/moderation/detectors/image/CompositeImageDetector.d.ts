import { ImageAnalysis } from "../../../../domain/ImageAnalysis";
import { ModerationEvidence } from "../../ModerationEvidence";
import { ImageRule } from "./ImageRule";
/**
 * Coordina l'esecuzione di tutte le ImageRule.
 *
 * Ogni regola osserva esclusivamente un aspetto
 * dell'immagine e produce eventuali evidenze
 * di moderazione.
 *
 * Il Composite raccoglie tutte le evidenze
 * prodotte dalle regole mantenendo le stesse
 * completamente indipendenti tra loro.
 */
export declare class CompositeImageDetector {
    private readonly rules;
    constructor(rules: readonly ImageRule[]);
    /**
     * Analizza tutte le immagini di un report.
     *
     * @param analyses Analisi prodotte dall'Image Analysis Engine.
     * @returns Tutte le evidenze prodotte dalle ImageRule.
     */
    analizza(analyses: readonly ImageAnalysis[]): readonly ModerationEvidence[];
}
//# sourceMappingURL=CompositeImageDetector.d.ts.map