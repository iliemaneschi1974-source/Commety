import { ReportCategory } from "../../../domain/ReportCategory";
import { TemporalPolicy } from "./TemporalPolicy";

/**
 * Policy temporale predefinita del dominio Commetty.
 *
 * Definisce la durata massima di validità
 * delle principali categorie di segnalazione.
 */
export class DefaultTemporalPolicy implements TemporalPolicy {
  private static readonly DEFAULT_DURATION =
    60 * 60 * 1000;

  private static readonly DURATIONS: Readonly<
    Record<ReportCategory, number>
  > = {
    traffico: 60 * 60 * 1000,
    meteo: 2 * 60 * 60 * 1000,
    pericolo: 3 * 60 * 60 * 1000,
    evento: 24 * 60 * 60 * 1000,
    mare: 3 * 60 * 60 * 1000,
  };

  getValidityDuration(
    category: ReportCategory,
  ): number {
    return (
      DefaultTemporalPolicy.DURATIONS[category] ??
      DefaultTemporalPolicy.DEFAULT_DURATION
    );
  }
}