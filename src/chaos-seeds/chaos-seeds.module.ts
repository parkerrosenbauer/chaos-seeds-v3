import { Module } from '@nestjs/common';
import { ChaosSeedsController } from './chaos-seeds.controller';
import { ChaosSeedsService } from './chaos-seeds.service';
import { AreasModule } from '../areas/areas.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChaosSeed } from './models/chaos-seed';

@Module({
  imports: [AreasModule, SequelizeModule.forFeature([ChaosSeed])],
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
  exports: [ChaosSeedsService, SequelizeModule],
})
export class ChaosSeedsModule {}
