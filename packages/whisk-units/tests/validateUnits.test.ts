import { describe, it, expect } from "vitest";
import { assertUnitDefinitions } from "../src/data/validateUnits";

describe("validateUnits", () => {
  it("accepts valid unit definitions", () => {
    const data = [
      {
        id: "gram",
        name: "gram",
        kind: "mass",
        symbols: ["g"],
        abbreviation: "g",
        baseUnit: "g",
        factor: 1,
      },
    ];

    expect(() => assertUnitDefinitions(data)).not.toThrow();
  });

  it("rejects duplicate unit ids", () => {
    const data = [
      {
        id: "gram",
        name: "gram",
        kind: "mass",
        symbols: ["g"],
        abbreviation: "g",
        baseUnit: "g",
        factor: 1,
      },
      {
        id: "gram",
        name: "gram duplicate",
        kind: "mass",
        symbols: ["gram"],
        abbreviation: "g",
        baseUnit: "g",
        factor: 1,
      },
    ];

    expect(() => assertUnitDefinitions(data)).toThrow(/Duplicate unit id/);
  });

  it("allows ambiguous symbols", () => {
    const data = [
      {
        id: "ounce-mass",
        name: "ounce",
        kind: "mass",
        symbols: ["oz"],
        abbreviation: "oz",
        baseUnit: "g",
        factor: 28.3495,
      },
      {
        id: "ounce-volume",
        name: "fluid ounce",
        kind: "volume",
        symbols: ["oz"],
        abbreviation: "fl oz",
        baseUnit: "mL",
        factor: 29.5735,
      },
    ];

    expect(() => assertUnitDefinitions(data)).not.toThrow();
  });
});
