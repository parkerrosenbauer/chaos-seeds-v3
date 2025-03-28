import { ChaosSeedCreateResponse } from "../../chaos-seeds/dtos";

export const AREA = {
  regionId: 1,
  biomeId: 1,
  id: 1,
  chance: 5,
};

export const CHAOS_SEED_DTO: ChaosSeedCreateResponse = {
  chaosSeedId: 1,
  startingArea: {
    regionName: "region",
    biomeName: "biome",
  },
  isDeadly: false,
};

export const CHAOS_SEED = {
  id: 1,
  isDeadOnArrival: false,
  startingAreaId: 1,
  name: "Unknown",
};

export const DEAD_CHAOS_SEED = {
  id: 2,
  isDeadOnArrival: true,
  startingAreaId: 1,
  name: "Unknown",
};

export const ABILITY = {
  id: 1,
  name: "ability",
  description: "description",
  chance: 5,
};

export const RACE = {
  id: 1,
  name: "race",
  description: "description",
  languageId: 2,
  chance: 5,
};

export const LANGUAGE = {
  id: 2,
  name: "language",
};

export const COMMON = {
  id: 1,
  name: "Common",
};
