import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ability, Language, Race } from "./models";
import { randomChance } from "../common/utils";

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(Race) private raceModel: typeof Race,
    @InjectModel(Ability) private abilityModel: typeof Ability,
    @InjectModel(Language) private languageModel: typeof Language
  ) {}

  async getAbilityById(id: number): Promise<Ability> {
    const ability = await this.abilityModel.findByPk(id);
    if (!ability) throw new NotFoundException("Ability not found");
    return ability;
  }

  async getRaceById(id: number): Promise<Race> {
    const race = await this.raceModel.findByPk(id);
    if (!race) throw new NotFoundException("Race not found");
    return race;
  }

  async getLanguageById(id: number): Promise<Language> {
    const language = await this.languageModel.findByPk(id);
    if (!language) throw new NotFoundException("Language not found");
    return language;
  }

  async getRandomRace(): Promise<Race> {
    const races = await this.raceModel.findAll();
    return randomChance<Race>(races);
  }

  async getRandomAbility(): Promise<Ability> {
    const abilities = await this.abilityModel.findAll();
    return randomChance<Ability>(abilities);
  }

  async getRacialLanguage(raceId: number): Promise<Language | null> {
    const race = await this.raceModel.findByPk(raceId);
    if (!race) throw new NotFoundException("Race not found");
    return await race.$get("language");
  }

  async getCommonLanguage(): Promise<Language> {
    const commonLanguage = await this.languageModel.findOne({
      where: { name: "Common" },
    });
    return commonLanguage!;
  }
}
