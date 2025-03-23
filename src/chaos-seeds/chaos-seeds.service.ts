import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AreasService } from '../areas/areas.service';
import { AreaNameResponse } from '../areas/dtos';
import { ChaosSeedCreateResponse, ChaosSeedNameReqRes } from './dtos';
import { ChaosSeed } from './models/chaos-seed';
import { InjectModel } from '@nestjs/sequelize';
import {
  Ability,
  ChaosSeedAbility,
  ChaosSeedLanguage,
  Language,
  Race,
} from './models';
import { randomChance } from '../common/utils';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ChaosSeedsService {
  constructor(
    @InjectModel(ChaosSeed) private chaosSeedModel: typeof ChaosSeed,
    @InjectModel(Race) private raceModel: typeof Race,
    @InjectModel(Ability) private abilityModel: typeof Ability,
    @InjectModel(Language) private languageModel: typeof Language,
    @InjectModel(ChaosSeedLanguage)
    private chaosSeedLanguageModel: typeof ChaosSeedLanguage,
    @InjectModel(ChaosSeedAbility)
    private chaosSeedAbilityModel: typeof ChaosSeedAbility,
    @Inject(AreasService) private readonly areasService: AreasService,
    private sequelize: Sequelize,
  ) {}

  async create(): Promise<ChaosSeedCreateResponse> {
    const startingArea = await this.areasService.getRandom();
    const startingAreaName: AreaNameResponse = await this.areasService.getName(
      startingArea.id,
    );

    const chaosSeed = await this.chaosSeedModel.create({
      isDeadOnArrival: await this.areasService.getIsDeadly(startingArea.id),
      startingAreaId: startingArea.id,
    } as ChaosSeed);

    return {
      chaosSeedId: chaosSeed.id,
      startingArea: startingAreaName,
      isDeadly: chaosSeed.isDeadOnArrival,
    };
  }

  async getById(id: number): Promise<ChaosSeed> {
    const chaosSeed = await this.chaosSeedModel.findByPk(id);
    if (!chaosSeed) {
      throw new NotFoundException('Chaos seed not found');
    }
    return chaosSeed;
  }

  async getAll(): Promise<ChaosSeed[]> {
    return await this.chaosSeedModel.findAll();
  }

  async getAbilities(id: number): Promise<Ability[]> {
    const chaosSeed = await this.getById(id);
    return await chaosSeed.$get('abilities');
  }

  async getRace(id: number): Promise<Race | null> {
    const chaosSeed = await this.getById(id);
    return await chaosSeed.$get('race');
  }

  async getLanguages(id: number): Promise<Language[]> {
    const chaosSeed = await this.getById(id);
    return await chaosSeed.$get('languages');
  }

  async patchSelf(
    id: number,
    chaosSeedNameReq: ChaosSeedNameReqRes,
  ): Promise<ChaosSeedNameReqRes> {
    // find and verify chaos seed
    let chaosSeed = await this.getById(id);
    if (chaosSeed.isDeadOnArrival) {
      throw new BadRequestException('Cannot initialize dead chaos seed');
    }
    try {
      await this.sequelize.transaction(async (t) => {
        // set name
        chaosSeed.name = chaosSeedNameReq.name;

        // set race
        const randomRace = await this.getRandomRace();
        chaosSeed.raceId = randomRace.id;

        // set ability
        const randomAbility = await this.getRandomAbility();
        chaosSeed.abilities = [randomAbility];

        // set language(s)
        const commonLanguage = await this.languageModel.findOne({
          where: { name: 'Common' },
        });
        const languages: Language[] = [commonLanguage!];
        const racialLanguage = await this.getRacialLanguage(chaosSeed.raceId);

        if (racialLanguage) {
          languages.push(racialLanguage);
        }

        chaosSeed.languages = languages;

        // save updates
        chaosSeed = await chaosSeed.save();

        // update joint tables
        await randomRace.$add('chaosSeeds', chaosSeed);
        await randomAbility.$add('chaosSeeds', chaosSeed);

        if (racialLanguage) {
          await this.chaosSeedLanguageModel.create({
            chaosSeedId: chaosSeed.id,
            languageId: racialLanguage.id,
          });
        }

        await this.chaosSeedLanguageModel.create({
          chaosSeedId: chaosSeed.id,
          languageId: commonLanguage!.id,
        });

        await this.chaosSeedAbilityModel.create({
          chaosSeedId: chaosSeed.id,
          abilityId: randomAbility.id,
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return { name: chaosSeed.name };
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
    if (!race) throw new NotFoundException('Race not found');
    return await race.$get('language');
  }
}
