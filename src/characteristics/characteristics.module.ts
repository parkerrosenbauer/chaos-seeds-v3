import { forwardRef, Module } from "@nestjs/common";
import { CharacteristicsController } from "./characteristics.controller";
import { CharacteristicsService } from "./characteristics.service";
import { SequelizeModule } from "@nestjs/sequelize";
import {
  Ability,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from "./models";
import { ChaosSeed } from "../chaos-seeds/models";
import { ChaosSeedsModule } from "../chaos-seeds/chaos-seeds.module";

@Module({
  imports: [
    forwardRef(() => ChaosSeedsModule),
    SequelizeModule.forFeature([
      Race,
      Language,
      ChaosSeed,
      ChaosSeedLanguage,
      Ability,
      ChaosSeedAbility,
    ]),
  ],
  controllers: [CharacteristicsController],
  providers: [CharacteristicsService],
  exports: [CharacteristicsModule, SequelizeModule],
})
export class CharacteristicsModule {}
