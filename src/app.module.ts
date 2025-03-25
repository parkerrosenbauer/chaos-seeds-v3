import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChaosSeedsModule } from './chaos-seeds/chaos-seeds.module';
import { AreasModule } from './areas/areas.module';
import { DatabaseModule } from './database/database.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';

@Module({
  imports: [ChaosSeedsModule, AreasModule, DatabaseModule, CharacteristicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
