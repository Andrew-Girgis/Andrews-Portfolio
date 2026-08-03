import { describe, expect, it } from "vitest";
import { filterSlots, isValidTimeZone, presetConstraints } from "./booking";

describe("booking validation", () => {
  it("accepts IANA timezones and rejects arbitrary labels", () => {
    expect(isValidTimeZone("America/Toronto")).toBe(true);
    expect(isValidTimeZone("not-a-timezone")).toBe(false);
  });

  it("builds supported preset constraints", () => {
    expect(presetConstraints("next_week", "America/Toronto")?.period).toBe("any");
    expect(presetConstraints("morning", "America/Toronto")?.period).toBe("morning");
    expect(presetConstraints("unsupported", "America/Toronto")).toBeNull();
  });

  it("removes Cal slots that cross the requested local-date boundary", () => {
    const slots = filterSlots([
      { start: "2026-08-03T01:00:00.000Z", end: "2026-08-03T01:30:00.000Z" },
      { start: "2026-08-03T23:00:00.000Z", end: "2026-08-03T23:30:00.000Z" },
    ], {
      start: "2026-08-03",
      end: "2026-08-04",
      period: "any",
    }, "America/Toronto");

    expect(slots).toEqual([
      { start: "2026-08-03T23:00:00.000Z", end: "2026-08-03T23:30:00.000Z" },
    ]);
  });
});
