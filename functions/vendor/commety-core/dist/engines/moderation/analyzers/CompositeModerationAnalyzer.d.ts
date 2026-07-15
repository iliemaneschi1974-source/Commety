import { ImageAnalysis } from "../../../domain/ImageAnalysis";
import { UserContent } from "../../../domain/UserContent";
import { ModerationEvidence } from "../ModerationEvidence";
/**
 * Coordina tutti i detector del Moderation Engine
 * producendo un'unica collezione di evidenze.
 */
export declare class CompositeModerationAnalyzer {
    private readonly spamDetector;
    private readonly languageDetector;
    private readonly privacyDetector;
    private readonly qualityDetector;
    private readonly imageSafetyDetector;
    analizza(contenuto: UserContent, immagine?: ImageAnalysis): readonly ModerationEvidence[];
}
//# sourceMappingURL=CompositeModerationAnalyzer.d.ts.map