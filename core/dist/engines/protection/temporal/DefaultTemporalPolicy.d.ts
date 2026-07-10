import { ReportCategory } from "../../../domain/ReportCategory";
import { TemporalPolicy } from "./TemporalPolicy";
/**
 * Policy temporale predefinita del dominio Commetty.
 *
 * Definisce la durata massima di validità
 * delle principali categorie di segnalazione.
 */
export declare class DefaultTemporalPolicy implements TemporalPolicy {
    private static readonly DEFAULT_DURATION;
    private static readonly DURATIONS;
    getValidityDuration(category: ReportCategory): number;
}
//# sourceMappingURL=DefaultTemporalPolicy.d.ts.map