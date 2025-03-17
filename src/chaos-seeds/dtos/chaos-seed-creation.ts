import { AreaNameDto } from 'src/areas/dtos';

export interface ChaosSeedCreationDto {
  chaosSeedId: number;
  startingArea: AreaNameDto;
  isDeadly: boolean;
}
