export const REGIONS = [
  {
    id: 1,
    name: 'Region 1',
    description: 'Region 1 description',
  },
  {
    id: 2,
    name: 'Region 2',
    description: 'Region 2 description',
  },
];

export const BIOMES = [
  {
    id: 1,
    name: 'Biome 1',
    isDeadly: false,
  },
  {
    id: 2,
    name: 'Biome 2',
    isDeadly: true,
  },
];

export const AREAS = [
  {
    regionId: 1,
    biomeId: 1,
    id: 1,
    chance: 5,
  },
  {
    regionId: 1,
    biomeId: 2,
    id: 2,
    chance: 7,
  },
  {
    regionId: 2,
    biomeId: 1,
    id: 3,
    chance: 5,
  },
  {
    regionId: 2,
    biomeId: 2,
    id: 4,
    chance: 7,
  },
];
