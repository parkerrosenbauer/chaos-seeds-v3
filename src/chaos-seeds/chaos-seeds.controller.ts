import { Controller, Post } from '@nestjs/common';
import { ChaosSeedsService } from './chaos-seeds.service';
import { ChaosSeedCreationDto } from './dtos/chaos-seed-creation';

@Controller('chaos-seed')
export class ChaosSeedsController {
  constructor(private readonly chaosSeedsService: ChaosSeedsService) {}

  @Post()
  async create(): Promise<ChaosSeedCreationDto> {
    return await this.chaosSeedsService.create();
  }
}
