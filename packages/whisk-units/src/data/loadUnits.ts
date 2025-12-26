import { UnitDefinition } from "../UnitDefinition";
import rawUnits from "./units.json";
import { assertUnitDefinitions } from "./validateUnits";

assertUnitDefinitions(rawUnits);

export const unitDefinitions = rawUnits as readonly UnitDefinition[];
