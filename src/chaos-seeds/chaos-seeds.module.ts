import { Module } from '@nestjs/common';
import { ChaosSeedsController } from './chaos-seeds.controller';
import { ChaosSeedsService } from './chaos-seeds.service';

@Module({
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
})
export class ChaosSeedsModule {}
