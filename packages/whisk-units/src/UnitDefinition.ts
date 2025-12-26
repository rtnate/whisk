// whisk-units/src/UnitDefinition.ts
import type { Unit, UnitKind } from "@rtnate/whisk-core";

export interface UnitDefinition extends Unit {
  /**
   * Human-readable unit name (for display and documentation).
   */
  name: string;

  /**
   * Preferred abbreviated form for formatting output (e.g. "tbsp", "g").
   */
  abbreviation: string;

  /**
   * Canonical base unit used for conversion (e.g. "mL", "g").
   */
  baseUnit: string;

  /**
   * Conversion factor to the base unit.
   *
   * For example, 1 cup = 240 mL → factor = 240.
   */
  factor: number;
}
