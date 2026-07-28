import { describe, expect, it } from "vitest";

import { calculateMonthlyTrend } from "../report-statistics";

describe("calculateMonthlyTrend", () => {
  it("calcola la crescita rispetto al mese precedente", () => {
    expect(calculateMonthlyTrend([8, 10])).toMatchObject({
      percentage: 25,
      label: "+25%",
      direction: "up",
    });
  });

  it("calcola la diminuzione rispetto al mese precedente", () => {
    expect(calculateMonthlyTrend([10, 7])).toMatchObject({
      percentage: -30,
      label: "-30%",
      direction: "down",
    });
  });

  it("non inventa una percentuale quando il mese precedente è zero", () => {
    expect(calculateMonthlyTrend([0, 3])).toMatchObject({
      percentage: null,
      label: "n.d.",
      direction: "unavailable",
    });
  });

  it("mostra variazione nulla quando entrambi i mesi sono a zero", () => {
    expect(calculateMonthlyTrend([0, 0])).toMatchObject({
      percentage: 0,
      label: "0%",
      direction: "flat",
    });
  });
});
