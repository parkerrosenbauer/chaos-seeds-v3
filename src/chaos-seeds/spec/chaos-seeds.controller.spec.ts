import { Test, TestingModule } from '@nestjs/testing';
import { ChaosSeedsController } from '../chaos-seeds.controller';
import {
  ABILITY,
  AREA,
  CHAOS_SEED,
  CHAOS_SEED_DTO,
  COMMON,
  LANGUAGE,
  RACE,
} from './test-data';
import { AreasService } from 'src/areas/areas.service';
import { ChaosSeedsService } from '../chaos-seeds.service';

describe('ChaosSeedsController', () => {
  let controller: ChaosSeedsController;
  const chaosSeedsService = {
    create: jest.fn().mockResolvedValue(CHAOS_SEED_DTO),
    getById: jest.fn().mockResolvedValue(CHAOS_SEED),
    getAll: jest.fn().mockResolvedValue([CHAOS_SEED]),
    getAbilities: jest.fn().mockResolvedValue([ABILITY]),
    getRace: jest.fn().mockResolvedValue(RACE),
    getLanguages: jest.fn().mockResolvedValue([COMMON, LANGUAGE]),
    patchSelf: jest.fn().mockResolvedValue({ name: 'Heman' }),
  };
  const areasService = {
    getRandom: jest.fn().mockResolvedValue(AREA),
    getIsDeadly: jest.fn().mockResolvedValue(false),
    getName: jest.fn().mockResolvedValue({
      regionName: 'region',
      biomeName: 'biome',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaosSeedsController],
      providers: [
        {
          provide: AreasService,
          useValue: areasService,
        },
        {
          provide: ChaosSeedsService,
          useValue: chaosSeedsService,
        },
      ],
    }).compile();

    controller = module.get<ChaosSeedsController>(ChaosSeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new chaos seed', () => {
      const chaosSeed = controller.create();
      expect(chaosSeed).resolves.toEqual(CHAOS_SEED_DTO);
      expect(chaosSeedsService.create).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a chaos seed by id', () => {
      const chaosSeed = controller.getById(1);
      expect(chaosSeed).resolves.toEqual(CHAOS_SEED);
      expect(chaosSeedsService.getById).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('should return all chaos seeds', () => {
      const chaosSeeds = controller.getAll();
      expect(chaosSeeds).resolves.toEqual([CHAOS_SEED]);
      expect(chaosSeedsService.getAll).toHaveBeenCalled();
    });
  });

  describe('getAbilities', () => {
    it('should return all abilities for a chaos seed', () => {
      const abilities = controller.getAbilities(1);
      expect(abilities).resolves.toEqual([ABILITY]);
      expect(chaosSeedsService.getAbilities).toHaveBeenCalled();
    });
  });

  describe('getRace', () => {
    it('should return the race of a chaos seed', () => {
      const race = controller.getRace(1);
      expect(race).resolves.toEqual(RACE);
      expect(chaosSeedsService.getRace).toHaveBeenCalled();
    });
  });

  describe('getLanguages', () => {
    it('should return all languages for a chaos seed', () => {
      const languages = controller.getLanguages(1);
      expect(languages).resolves.toEqual([COMMON, LANGUAGE]);
      expect(chaosSeedsService.getLanguages).toHaveBeenCalled();
    });
  });

  describe('patchSelf', () => {
    it('should returned the cleaned chaos seed name', () => {
      const chaosSeedNameReq = { name: 'Heman_123' };
      const chaosSeedName = controller.patchSelf(1, chaosSeedNameReq);
      expect(chaosSeedName).resolves.toEqual({ name: 'Heman' });
      expect(chaosSeedsService.patchSelf).toHaveBeenCalled();
    });
  });
});
