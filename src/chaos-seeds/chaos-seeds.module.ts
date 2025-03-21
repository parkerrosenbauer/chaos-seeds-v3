import { Module } from '@nestjs/common';
import { ChaosSeedsController } from './chaos-seeds.controller';
import { ChaosSeedsService } from './chaos-seeds.service';
import { AreasModule } from '../areas/areas.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChaosSeed } from './models/chaos-seed';
import { Area, Biome, Region } from '../areas/models';

@Module({
  imports: [
    AreasModule,
    SequelizeModule.forFeature([ChaosSeed, Area, Region, Biome]),
  ],
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
  exports: [ChaosSeedsService, SequelizeModule],
})
export class ChaosSeedsModule {}
