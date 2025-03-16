import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChaosSeedsModule } from './chaos-seeds/chaos-seeds.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [ChaosSeedsModule, AreasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
