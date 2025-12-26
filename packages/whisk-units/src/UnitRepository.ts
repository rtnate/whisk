// whisk-units/src/UnitRepository.ts
import type { Unit } from "@rtnate/whisk-core";
import type { UnitDefinition } from "./UnitDefinition";

/**
 * Repository providing access to known measurement units.
 *
 * This class encapsulates unit lookup logic and intentionally hides
 * conversion metadata from consumers that only require unit identity
 * (such as parsers).
 */
export class UnitRepository {
  private readonly byId: Map<string, UnitDefinition>;
  private readonly bySymbol = new Map<string, readonly UnitDefinition[]>();
  private readonly definitions: readonly UnitDefinition[];
  private _units?: readonly Unit[];

  constructor(definitions: readonly UnitDefinition[]) {
    this.definitions = definitions;
    this.byId = new Map();
    this.bySymbol = new Map();

    for (const def of definitions) {
      this.byId.set(def.id, def);

      for (const symbol of def.symbols) {
        const key = symbol.toLowerCase();
        const current = this.bySymbol.get(key) ?? [];
        this.bySymbol.set(key, [...current, def]);
      }
    }
  }

  /**
   * List all known units as public Unit objects.
   */
  get units(): readonly Unit[] {
    //lazy load
    if (!this._units) {
      this._units = this.definitions.map((d) => this.toUnit(d));
    }
    return this._units;
  }

  /**
   * Find a unit by one of its textual symbols (e.g. "cup", "tbsp", "g").
   *
   * Matching is case-insensitive.
   */
  findBySymbol(token: string): readonly Unit[] {
    const defs = this.bySymbol.get(token.toLowerCase());
    if (!defs) return [];

    return defs.map((d) => this.toUnit(d));
  }

  /**
   * Retrieve a unit by its canonical identifier.
   */
  findById(id: string): Unit | undefined {
    const def = this.byId.get(id);
    if (!def) return undefined;

    return this.toUnit(def);
  }

  /**
   * Retrieve the full unit definition by canonical identifier.
   *
   * Intended for advanced use cases such as conversion or formatting.
   */
  getDefinition(id: string): UnitDefinition | undefined {
    return this.byId.get(id);
  }

  /**
   * Converts a UnitDefinition to a plain Unit
   */
  private toUnit(def: UnitDefinition): Unit {
    return {
      id: def.id,
      kind: def.kind,
      symbols: def.symbols,
    };
  }
}
