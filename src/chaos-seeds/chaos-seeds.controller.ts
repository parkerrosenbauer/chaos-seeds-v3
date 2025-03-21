import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ChaosSeedsService } from './chaos-seeds.service';
import { ChaosSeedCreateResponse, ChaosSeedNameReqRes } from './dtos';

@Controller('chaos-seeds')
export class ChaosSeedsController {
  constructor(private readonly chaosSeedsService: ChaosSeedsService) {}

  @Post()
  async create(): Promise<ChaosSeedCreateResponse> {
    return await this.chaosSeedsService.create();
  }

  @Patch('/:id/name')
  async patchName(
    @Param('id') id: number,
    @Body() chaosSeedNameReq: ChaosSeedNameReqRes,
  ): Promise<ChaosSeedNameReqRes> {
    return await this.chaosSeedsService.patchName(id, chaosSeedNameReq);
  }
}
