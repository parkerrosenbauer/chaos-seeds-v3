import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AreasService } from '../areas/areas.service';
import { AreaNameResponse } from '../areas/dtos';
import { ChaosSeedCreateResponse, ChaosSeedNameReqRes } from './dtos';
import { ChaosSeed } from './models/chaos-seed';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ChaosSeedsService {
  constructor(
    @InjectModel(ChaosSeed) private chaosSeed: typeof ChaosSeed,
    @Inject(AreasService) private readonly areasService: AreasService,
  ) {}

  async create(): Promise<ChaosSeedCreateResponse> {
    const startingArea = await this.areasService.getRandom();
    const startingAreaName: AreaNameResponse = await this.areasService.getName(
      startingArea.id,
    );

    const chaosSeed = await this.chaosSeed.create({
      isDeadOnArrival: await this.areasService.getIsDeadly(startingArea.id),
      startingAreaId: startingArea.id,
    } as ChaosSeed);

    return {
      chaosSeedId: chaosSeed.id,
      startingArea: startingAreaName,
      isDeadly: chaosSeed.isDeadOnArrival,
    };
  }

  async getById(id: number): Promise<ChaosSeed> {
    const chaosSeed = await this.chaosSeed.findByPk(id);
    if (!chaosSeed) {
      throw new NotFoundException('Chaos seed not found');
    }
    return chaosSeed;
  }

  async patchName(
    id: number,
    chaosSeedNameReq: ChaosSeedNameReqRes,
  ): Promise<ChaosSeedNameReqRes> {
    const chaosSeed = await this.getById(id);
    if (chaosSeed.isDeadOnArrival) {
      throw new BadRequestException('Cannot update name of a dead chaos seed');
    }
    chaosSeed.name = chaosSeedNameReq.name;
    await chaosSeed.save();
    return { name: chaosSeed.name };
  }
}
