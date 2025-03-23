import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ChaosSeedsService } from './chaos-seeds.service';
import { ChaosSeedCreateResponse, ChaosSeedNameReqRes } from './dtos';
import { ChaosSeed } from './models';

@Controller('chaos-seeds')
export class ChaosSeedsController {
  constructor(private readonly chaosSeedsService: ChaosSeedsService) {}

  @Post()
  async create(): Promise<ChaosSeedCreateResponse> {
    return await this.chaosSeedsService.create();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ChaosSeed> {
    return await this.chaosSeedsService.getById(id);
  }

  @Get()
  async getAll() {
    return await this.chaosSeedsService.getAll();
  }

  @Get('abilities/:id')
  async getAbilities(@Param('id', ParseIntPipe) id: number) {
    return await this.chaosSeedsService.getAbilities(id);
  }

  @Get('race/:id')
  async getRace(@Param('id', ParseIntPipe) id: number) {
    return await this.chaosSeedsService.getRace(id);
  }

  @Get('languages/:id')
  async getLanguages(@Param('id', ParseIntPipe) id: number) {
    return await this.chaosSeedsService.getLanguages(id);
  }

  @Patch(':id/self')
  async patchSelf(
    @Param('id', ParseIntPipe) id: number,
    @Body() chaosSeedNameReq: ChaosSeedNameReqRes,
  ): Promise<ChaosSeedNameReqRes> {
    return await this.chaosSeedsService.patchSelf(id, chaosSeedNameReq);
  }
}
