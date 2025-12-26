import { describe, it, expect } from "vitest";
import { UnitRepository } from "../src/UnitRepository";
import { unitDefinitions } from "../src/data/loadUnits";

describe("UnitRepository", () => {
  const repo = new UnitRepository(unitDefinitions);

  it("finds unit by symbol", () => {
    const result = repo.findBySymbol("g");
    expect(result.length).toBe(1);
    expect(result[0].id).toBe("g");
  });

  it("returns empty array for unknown symbol", () => {
    const result = repo.findBySymbol("nonsense");
    expect(result).toEqual([]);
  });

  it("returns multiple units for ambiguous symbol", () => {
    const result = repo.findBySymbol("oz");
    expect(result.length).toBeGreaterThan(1);
  });

  it("finds unit by id", () => {
    const unit = repo.findById("g");
    expect(unit?.symbols).toContain("gram");
  });

  it("does not expose conversion metadata", () => {
    const unit = repo.findById("g") as any;
    expect(unit.factor).toBeUndefined();
    expect(unit.baseUnit).toBeUndefined();
  });
});
