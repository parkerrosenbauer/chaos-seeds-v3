import { Module } from '@nestjs/common';
import { AreasController } from './areas.controller';
import { AreasService } from './areas.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Area, Biome, Region } from './models';

@Module({
  imports: [SequelizeModule.forFeature([Area, Biome, Region])],
  controllers: [AreasController],
  providers: [AreasService],
  exports: [AreasService, SequelizeModule],
})
export class AreasModule {}
