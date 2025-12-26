import type { UnitDefinition } from "../UnitDefinition";
import type { UnitKind } from "@rtnate/whisk-core";

const UNIT_KINDS: readonly UnitKind[] = ["mass", "volume", "count", "unknown"];

function isUnitKind(value: unknown): value is UnitKind {
  return typeof value === "string" && UNIT_KINDS.includes(value as UnitKind);
}

export function assertUnitDefinitions(
  data: unknown
): asserts data is UnitDefinition[] {
  if (!Array.isArray(data)) {
    throw new Error("units.json must be an array");
  }

  const seenIds = new Set<string>();

  for (const [index, unit] of data.entries()) {
    if (typeof unit !== "object" || unit === null) {
      throw new Error(`Unit at index ${index} is not an object`);
    }

    const u = unit as Record<string, unknown>;

    if (typeof u.id !== "string") {
      throw new Error(`Unit[${index}].id must be a string`);
    }

    if (seenIds.has(u.id)) {
      throw new Error(`Duplicate unit id "${u.id}"`);
    }
    seenIds.add(u.id);

    if (typeof u.name !== "string") {
      throw new Error(`Unit[${index}].name must be a string`);
    }

    if (!isUnitKind(u.kind)) {
      throw new Error(`Unit[${index}].kind is invalid`);
    }

    if (
      !Array.isArray(u.symbols) ||
      !u.symbols.every((s) => typeof s === "string")
    ) {
      throw new Error(`Unit[${index}].symbols must be string[]`);
    }

    if (typeof u.abbreviation !== "string") {
      throw new Error(`Unit[${index}].abbreviation must be a string`);
    }

    if (typeof u.baseUnit !== "string") {
      throw new Error(`Unit[${index}].baseUnit must be a string`);
    }

    if (typeof u.factor !== "number" || !Number.isFinite(u.factor)) {
      throw new Error(`Unit[${index}].factor must be a finite number`);
    }
  }
}
