import { Inject, Injectable } from '@nestjs/common';
import { AreasService } from '../areas/areas.service';
import { AreaNameDto } from '../areas/dtos';
import { ChaosSeedCreationDto } from './dtos/chaos-seed-creation';
import { ChaosSeed } from './models/chaos-seed';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ChaosSeedsService {
  constructor(
    @InjectModel(ChaosSeed) private chaosSeed: typeof ChaosSeed,
    @Inject(AreasService) private readonly areasService: AreasService,
  ) {}

  async create(): Promise<ChaosSeedCreationDto> {
    const startingArea = this.areasService.getRandom();
    const startingAreaName: AreaNameDto = this.areasService.getName(
      startingArea.id,
    );
    const chaosSeed = await this.chaosSeed.create({
      isDeadOnArrival: this.areasService.getIsDeadly(startingArea.id),
      startingAreaId: startingArea.id,
    } as ChaosSeed);

    return {
      chaosSeedId: chaosSeed.id,
      startingArea: startingAreaName,
      isDeadly: chaosSeed.isDeadOnArrival,
    };
  }
}
