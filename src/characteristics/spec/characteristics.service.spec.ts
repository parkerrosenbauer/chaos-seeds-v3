import { Test, TestingModule } from "@nestjs/testing";
import { CharacteristicsService } from "../characteristics.service";
import { ABILITY, CHAOS_SEED, COMMON, LANGUAGE, RACE } from "./test-data";
import { getModelToken } from "@nestjs/sequelize";
import { ChaosSeed } from "../../chaos-seeds/models";
import { Ability, Language, Race } from "../models";
import { ChaosSeedsService } from "../../chaos-seeds/chaos-seeds.service";

describe("CharacteristicsService", () => {
  let service: CharacteristicsService;
  const mockChaosSeedInstance = {
    ...CHAOS_SEED,
    $get: jest.fn().mockImplementation((relation) => {
      if (relation === "abilities") return Promise.resolve([ABILITY]);
      if (relation === "race") return Promise.resolve(RACE);
      if (relation === "languages") return Promise.resolve([COMMON, LANGUAGE]);
      return Promise.resolve(null);
    }),
  };
  const mockChaosSeedService = {
    getById: jest.fn().mockResolvedValue(mockChaosSeedInstance),
  };
  const mockAbility = {
    findAll: jest.fn().mockResolvedValue([ABILITY]),
  };
  const mockRaceInstance = {
    ...RACE,
    $get: jest.fn().mockResolvedValue(LANGUAGE),
  };
  const mockRace = {
    findByPk: jest.fn().mockResolvedValue(mockRaceInstance),
    findAll: jest.fn().mockResolvedValue([mockRaceInstance]),
  };
  const mockLanguage = {
    findOne: jest.fn().mockResolvedValue(COMMON),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacteristicsService,
        {
          provide: getModelToken(ChaosSeed),
          useValue: {},
        },
        {
          provide: getModelToken(Ability),
          useValue: mockAbility,
        },
        {
          provide: getModelToken(Race),
          useValue: mockRace,
        },
        {
          provide: getModelToken(Language),
          useValue: mockLanguage,
        },
        {
          provide: ChaosSeedsService,
          useValue: mockChaosSeedService,
        },
      ],
    }).compile();

    service = module.get<CharacteristicsService>(CharacteristicsService);
  });

  describe("getAbilities", () => {
    it("should return the abilities of a chaos seed", async () => {
      const abilities = await service.getAbilities(1);
      expect(abilities).toEqual([ABILITY]);
    });
  });

  describe("getRace", () => {
    it("should return the race of a chaos seed", async () => {
      const race = await service.getRace(1);
      expect(race).toEqual(RACE);
    });
  });

  describe("getLanguages", () => {
    it("should return the languages of a chaos seed", async () => {
      const languages = await service.getLanguages(1);
      expect(languages).toEqual([COMMON, LANGUAGE]);
    });
  });

  describe("getRandomAbility", () => {
    it("should return a random ability", async () => {
      const ability = await service.getRandomAbility();
      expect(ability).toEqual(ABILITY);
      expect(mockAbility.findAll).toHaveBeenCalled();
    });
  });

  describe("getRandomRace", () => {
    it("should return a random race", async () => {
      const race = await service.getRandomRace();
      expect(race).toEqual(mockRaceInstance);
      expect(mockRace.findAll).toHaveBeenCalled();
    });
  });

  describe("getRacialLanguage", () => {
    it("should return the racial language if it exists", async () => {
      const racialLanguage = await service.getRacialLanguage(1);
      expect(racialLanguage).toEqual(LANGUAGE);
    });
  });
});
