// src/data/createUnitRepository.ts
import { unitDefinitions } from "./loadUnits";
import { UnitRepository } from "../UnitRepository";

export const unitRepository = new UnitRepository(unitDefinitions);
