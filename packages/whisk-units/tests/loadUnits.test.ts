import { describe, it, expect } from "vitest";
import { unitDefinitions } from "../src/data/loadUnits";

describe("loadUnits", () => {
  it("loads unit definitions", () => {
    expect(unitDefinitions.length).toBeGreaterThan(0);
  });

  it("contains canonical unit ids", () => {
    const ids = unitDefinitions.map((u) => u.id);
    expect(ids).toContain("g");
    expect(ids).toContain("cup");
  });
});
