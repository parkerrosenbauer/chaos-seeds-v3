import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('/:id')
  getById(@Query(ParseIntPipe) id: number) {
    return this.areasService.getById(id);
  }

  @Get('/random')
  getRandom() {
    return this.areasService.getRandom();
  }

  @Get()
  getAll() {
    return this.areasService.getAll();
  }
}
