export type ReportType =
  | "meteo"
  | "traffico"
  | "pericolo"
  | "evento"
  | "mare";

export interface Report {
  id: number;
  type: ReportType;
  title: string;
  description: string;
  lat: number;
  lng: number;
}