import { describe, expect, it } from "vitest";
import { PLACES } from "@/data/places";
import { searchPlaces } from "@/lib/search";

describe("searchPlaces", () => {
  it("'Lunch under £5' only returns places at or below £5", () => {
    const r = searchPlaces(PLACES, "Lunch under £5", "all");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => (p.typicalPrice ?? 99) <= 5)).toBe(true);
  });
  it("search respects the active category filter", () => {
    const r = searchPlaces(PLACES, "wifi", "cafe");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.category === "cafe")).toBe(true);
  });
});
