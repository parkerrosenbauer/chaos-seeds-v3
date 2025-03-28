import { Module } from "@nestjs/common";
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

@Module({
  imports: [
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
  exports: [CharacteristicsService, SequelizeModule],
})
export class CharacteristicsModule {}
