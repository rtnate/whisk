// whisk-core/src/Quantity.ts
import type { Unit } from "./Unit";

export interface Quantity {
  value: number;
  unit: Unit;
}
