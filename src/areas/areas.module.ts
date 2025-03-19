import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { AREAS, BIOMES, REGIONS } from './spec/test-data';

@Module({
  controllers: [AreasController],
  providers: [
    AreasService,
    { provide: 'AREAS', useValue: AREAS },
    { provide: 'BIOMES', useValue: BIOMES },
    { provide: 'REGIONS', useValue: REGIONS },
  ],
  exports: [AreasService],
})
export class AreasModule {}
