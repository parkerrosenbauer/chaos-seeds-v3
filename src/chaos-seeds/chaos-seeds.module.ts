import { Module } from '@nestjs/common';
import { ChaosSeedsController } from './chaos-seeds.controller';
import { ChaosSeedsService } from './chaos-seeds.service';
import { AreasModule } from 'src/areas/areas.module';

@Module({
  imports: [AreasModule],
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
})
export class ChaosSeedsModule {}
