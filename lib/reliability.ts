export type ReliabilityTier =
  | "NUOVO_MEMBRO"
  | "AFFIDABILE"
  | "REPORTER_VERIFICATO"
  | "SENTINELLA_LOCALE";

export interface ReliabilityProfile {
  score: number;
  tier: ReliabilityTier;
  label: string;
  verified: boolean;
}

const RELIABILITY_TIERS: Array<
  Omit<ReliabilityProfile, "score"> & { minimumScore: number }
> = [
  { minimumScore: 70, tier: "SENTINELLA_LOCALE", label: "Sentinella locale", verified: true },
  { minimumScore: 40, tier: "REPORTER_VERIFICATO", label: "Reporter verificato", verified: true },
  { minimumScore: 15, tier: "AFFIDABILE", label: "Affidabile", verified: false },
  { minimumScore: 0, tier: "NUOVO_MEMBRO", label: "Nuovo membro", verified: false },
];

export function getReliabilityProfile(score: number): ReliabilityProfile {
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));
  const tier = RELIABILITY_TIERS.find(
    (item) => normalizedScore >= item.minimumScore
  ) ?? RELIABILITY_TIERS[RELIABILITY_TIERS.length - 1];

  return { score: normalizedScore, tier: tier.tier, label: tier.label, verified: tier.verified };
}
