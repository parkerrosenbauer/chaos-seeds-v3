import { AreaNameResponse } from 'src/areas/dtos';

export interface ChaosSeedCreateResponse {
  chaosSeedId: number;
  startingArea: AreaNameResponse;
  isDeadly: boolean;
}
