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
    @Inject(AreasService)
    private readonly areasService: AreasService,
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
    });

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
        chaosSeed.set('name', chaosSeedNameReq.name);
        chaosSeed = await chaosSeed.save();

        // set race
        const randomRace = await this.getRandomRace();
        await chaosSeed.$set('race', randomRace, { transaction: t });

        // set ability
        const randomAbility = await this.getRandomAbility();
        await chaosSeed.$add('abilities', randomAbility, { transaction: t });

        // set language(s)
        const commonLanguage = await this.languageModel.findOne({
          where: { name: 'Common' },
        });
        await chaosSeed.$add('languages', commonLanguage!, { transaction: t });

        const racialLanguage = await this.getRacialLanguage(randomRace.id);
        if (racialLanguage) {
          await chaosSeed.$add('languages', racialLanguage, { transaction: t });
        }
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
