export interface MonthlyTrend {
  current: number;
  previous: number;
  percentage: number | null;
  label: string;
  direction: "up" | "down" | "flat" | "unavailable";
}

export function calculateMonthlyTrend(
  monthlyValues: readonly number[]
): MonthlyTrend {
  const current = monthlyValues.at(-1) ?? 0;
  const previous = monthlyValues.at(-2) ?? 0;

  if (previous === 0) {
    if (current === 0) {
      return {
        current,
        previous,
        percentage: 0,
        label: "0%",
        direction: "flat",
      };
    }

    return {
      current,
      previous,
      percentage: null,
      label: "n.d.",
      direction: "unavailable",
    };
  }

  const percentage =
    Math.round(((current - previous) / previous) * 1000) / 10;

  return {
    current,
    previous,
    percentage,
    label: `${percentage > 0 ? "+" : ""}${percentage.toLocaleString(
      "it-IT",
      { maximumFractionDigits: 1 }
    )}%`,
    direction:
      percentage > 0 ? "up" : percentage < 0 ? "down" : "flat",
  };
}
