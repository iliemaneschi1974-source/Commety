import { ImageAnalysis } from "../../domain/ImageAnalysis";
import { UserContent } from "../../domain/UserContent";
import { ContentConsistencyAnalysis } from "../../domain/ContentConsistencyAnalysis";
import { ModerationEvidence } from "./ModerationEvidence";
/**
 * ============================================================================
 * MODERATION ANALYSIS PIPELINE
 * ----------------------------------------------------------------------------
 *
 * Coordina tutti gli analyzer e i detector del Moderation Engine,
 * producendo un'unica collezione di evidenze.
 *
 * La pipeline rappresenta il punto centrale di orchestrazione
 * dell'intero processo di analisi della moderazione.
 *
 * Non prende decisioni.
 * Non interpreta le evidenze.
 *
 * Si limita ad eseguire tutti i componenti di analisi e
 * raccoglierne i risultati.
 * ============================================================================
 */
export declare class ModerationAnalysisPipeline {
    private readonly spamDetector;
    private readonly languageDetector;
    private readonly privacyDetector;
    private readonly qualityDetector;
    /**
     * Punto di ingresso della moderazione immagini.
     */
    private readonly imageModerationDetector;
    /**
     * Analizzatore di coerenza
     * tra testo e immagini.
     */
    private readonly imageTextConsistencyAnalyzer;
    analizza(contenuto: UserContent, immagine?: ImageAnalysis, consistency?: ContentConsistencyAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=ModerationAnalysisPipeline.d.ts.map