import { Controller, Post } from '@nestjs/common';
import { AreasService } from './areas.service';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Post('/random')
  createRandom() {
    return this.areasService.createRandom();
  }
}
