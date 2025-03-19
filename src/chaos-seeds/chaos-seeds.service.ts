import { Inject, Injectable } from '@nestjs/common';
import { AreasService } from '../areas/areas.service';
import { ChaosSeed } from './models/chaos-seed';
import { AreaNameDto } from '../areas/dtos';
import { ChaosSeedCreationDto } from './dtos/chaos-seed-creation';

@Injectable()
export class ChaosSeedsService {
  constructor(
    @Inject(AreasService) private readonly areasService: AreasService,
  ) {}

  create(): ChaosSeedCreationDto {
    const startingArea = this.areasService.getRandom();
    const startingAreaName: AreaNameDto = this.areasService.getName(
      startingArea.id,
    );
    const chaosSeed = new ChaosSeed(
      1,
      this.areasService.getIsDeadly(startingArea.id),
      startingArea.id,
      1,
    );
    return {
      chaosSeedId: chaosSeed.id,
      startingArea: startingAreaName,
      isDeadly: chaosSeed.isDeadOnArrival,
    };
  }
}
