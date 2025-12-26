// whisk-core/src/Unit.ts
export type UnitKind = "mass" | "volume" | "count" | "unknown";

export interface Unit {
  id: string;
  kind: UnitKind;
  symbols: readonly string[];
}
