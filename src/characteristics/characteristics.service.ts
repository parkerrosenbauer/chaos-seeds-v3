import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Ability, Language, Race } from "./models";
import { ChaosSeedsService } from "../chaos-seeds/chaos-seeds.service";
import { randomChance } from "../common/utils";

@Injectable()
export class CharacteristicsService {
  constructor(
    @InjectModel(Race) private raceModel: typeof Race,
    @InjectModel(Ability) private abilityModel: typeof Ability,
    @InjectModel(Language) private languageModel: typeof Language,
    @Inject(forwardRef(() => ChaosSeedsService))
    private chaosSeedsService: ChaosSeedsService
  ) {}

  async getAbilities(id: number): Promise<Ability[]> {
    const chaosSeed = await this.chaosSeedsService.getById(id);
    return await chaosSeed.$get("abilities");
  }

  async getRace(id: number): Promise<Race | null> {
    const chaosSeed = await this.chaosSeedsService.getById(id);
    return await chaosSeed.$get("race");
  }

  async getLanguages(id: number): Promise<Language[]> {
    const chaosSeed = await this.chaosSeedsService.getById(id);
    return await chaosSeed.$get("languages");
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
