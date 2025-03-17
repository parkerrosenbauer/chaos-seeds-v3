import { Area } from 'src/areas/models/area';
import { ChaosSeedCreationDto } from '../dtos/chaos-seed-creation';

export const AREA: Area = {
  regionId: 1,
  biomeId: 1,
  id: 1,
  chance: 5,
};

export const CHAOS_SEED: ChaosSeedCreationDto = {
  chaosSeedId: 1,
  startingArea: {
    regionName: 'region',
    biomeName: 'biome',
  },
  isDeadly: false,
};
