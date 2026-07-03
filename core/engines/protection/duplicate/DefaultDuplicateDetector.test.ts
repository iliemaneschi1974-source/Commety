import { describe, expect, it } from "vitest";

import { ReportCategory } from "../../../domain/ReportCategory";
import { DefaultDuplicateDetector } from "./DefaultDuplicateDetector";
import { DuplicateCandidate } from "./DuplicateDetector";

const detector = new DefaultDuplicateDetector();

function candidate(
  overrides: Partial<DuplicateCandidate> = {},
): DuplicateCandidate {
  return {
    id: "report-1",
    category: "traffico" as ReportCategory,
    title: "Incidente sulla Tiburtina",
    latitude: 41.9100,
    longitude: 12.5300,
    occurredAt: new Date("2026-07-03T10:00:00Z"),
    ...overrides,
  };
}

describe("DefaultDuplicateDetector", () => {
  it("detects a duplicate when all conditions match", () => {
    const result = detector.analyze(
      candidate(),
      [
        candidate({
          id: "report-2",
        }),
      ],
    );

    expect(result.isDuplicate).toBe(true);
    expect(result.confidence).toBe(1);
    expect(result.matchedReportId).toBe("report-2");
  });

  it("returns false when categories differ", () => {
    const result = detector.analyze(
      candidate(),
      [
        candidate({
          id: "report-2",
          category: "meteo",
        }),
      ],
    );

    expect(result.isDuplicate).toBe(false);
  });

  it("returns false when titles differ", () => {
    const result = detector.analyze(
      candidate(),
      [
        candidate({
          id: "report-2",
          title: "Coda sul raccordo",
        }),
      ],
    );

    expect(result.isDuplicate).toBe(false);
  });

  it("returns false when reports are too far apart in time", () => {
    const result = detector.analyze(
      candidate(),
      [
        candidate({
          id: "report-2",
          occurredAt: new Date("2026-07-03T11:00:00Z"),
        }),
      ],
    );

    expect(result.isDuplicate).toBe(false);
  });

  it("returns false when reports are too far apart geographically", () => {
    const result = detector.analyze(
      candidate(),
      [
        candidate({
          id: "report-2",
          latitude: 45.4642,
          longitude: 9.1900,
        }),
      ],
    );

    expect(result.isDuplicate).toBe(false);
  });

  it("returns false when there are no nearby reports", () => {
    const result = detector.analyze(
      candidate(),
      [],
    );

    expect(result.isDuplicate).toBe(false);
    expect(result.confidence).toBe(0);
    expect(result.matchedReportId).toBeUndefined();
  });

  it("ignores case and extra spaces in titles", () => {
    const result = detector.analyze(
      candidate(),
      [
        candidate({
          id: "report-2",
          title: "  incidente   SULLA   tiburtina ",
        }),
      ],
    );

    expect(result.isDuplicate).toBe(true);
  });
});