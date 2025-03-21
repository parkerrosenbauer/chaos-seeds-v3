import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('/:id')
  async getById(@Query(ParseIntPipe) id: number) {
    return await this.areasService.getById(id);
  }

  @Get('/random')
  async getRandom() {
    return await this.areasService.getRandom();
  }

  @Get()
  async getAll() {
    return await this.areasService.getAll();
  }
}
