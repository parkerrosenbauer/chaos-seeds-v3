import { forwardRef, Module } from "@nestjs/common";
import { ChaosSeedsController } from "./chaos-seeds.controller";
import { ChaosSeedsService } from "./chaos-seeds.service";
import { AreasModule } from "../areas/areas.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ChaosSeed } from "./models/chaos-seed";
import { Area, Biome, Region } from "../areas/models";
import {
  Ability,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from "../characteristics/models";
import { CharacteristicsModule } from "../characteristics/characteristics.module";

@Module({
  imports: [
    AreasModule,
    forwardRef(() => CharacteristicsModule),
    SequelizeModule.forFeature([
      ChaosSeed,
      Race,
      Language,
      Ability,
      ChaosSeedAbility,
      ChaosSeedLanguage,
      Area,
      Region,
      Biome,
    ]),
  ],
  controllers: [ChaosSeedsController],
  providers: [ChaosSeedsService],
  exports: [ChaosSeedsService, SequelizeModule],
})
export class ChaosSeedsModule {}
