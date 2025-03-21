import { Area } from 'src/areas/models/area';
import { ChaosSeedCreateResponse } from '../dtos';

export const AREA = {
  regionId: 1,
  biomeId: 1,
  id: 1,
  chance: 5,
};

export const CHAOS_SEED: ChaosSeedCreateResponse = {
  chaosSeedId: 1,
  startingArea: {
    regionName: 'region',
    biomeName: 'biome',
  },
  isDeadly: false,
};
