import { UserContent } from "../../../../../../domain/UserContent";
import { ModerationEvidence } from "../../../../ModerationEvidence";
import { QualityRule } from "../QualityRule";
/**
 * Rileva testi privi di significato.
 *
 * La regola non implementa alcun algoritmo
 * di analisi: delega completamente la
 * valutazione al Text Quality Engine.
 */
export declare class GibberishRule implements QualityRule {
    private readonly scorer;
    analizza(contenuto: UserContent): readonly ModerationEvidence[];
}
//# sourceMappingURL=GibberishRule.d.ts.map